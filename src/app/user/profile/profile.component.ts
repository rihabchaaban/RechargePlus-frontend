import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {
    idUser: 0,
    name: '',
    email: '',
    password: '',
    mobile_number: '',
    address: '',
    birth_date: '',
    country: '',
    role: '',
    photo: ''
  };

  notification = {
    message: '',
    type: ''  // exemple : 'success' ou 'error'
  };
  
  errorMessage: string = '';
  success: string = '';
  passwordError: string = '';
  passwordSuccess: string = '';
  isRemovingPhoto = false;
  showPasswordForm = false;

  passwords = {
    old: '',
    new: '',
    confirm: ''
  };

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    console.log("🔍 ID utilisateur extrait du token :", userId);

    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          // 🔄 Affecte les infos de base
          this.user = data;
      
          // 📸 Si face_photo existe, construire une image base64
          if (data.face_photo) {
            this.user.photo = `data:image/png;base64,${data.face_photo}`;
          }
      
          console.log("✅ Données utilisateur :", this.user);
        },
        error: () => alert('Erreur lors du chargement du profil')
      });
      
  }
}

  onUpdate() {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.success = '';
      alert("Utilisateur non connecté.");
      return;
    }

    this.userService.updateUser(userId, this.user).subscribe({
      next: () => {
        this.success = 'Modifications enregistrées ✅';
        setTimeout(() => this.success = '', 3000);
      },
      error: () => {
        alert("Erreur lors de la mise à jour.");
      }
    });
  }

  onChangePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';

    if (!this.passwords.old || !this.passwords.new || !this.passwords.confirm) {
      this.passwordError = 'Tous les champs sont requis.';
      return;
    }

    if (this.passwords.new !== this.passwords.confirm) {
      this.passwordError = 'Les nouveaux mots de passe ne correspondent pas.';
      return;
    }

    const payload = {
      oldPassword: this.passwords.old,
      newPassword: this.passwords.new
    };

    this.authService.changePassword(payload).subscribe({
      next: (res) => {
        this.passwordSuccess = res;
        this.passwords = { old: '', new: '', confirm: '' };
        setTimeout(() => this.passwordSuccess = '', 3000);
      },
      error: (err) => {
        console.error('Erreur lors du changement de mot de passe :', err);
        this.passwordError = 'Erreur lors de la mise à jour.';
      }
    });
  }

 
  
  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    this.userService.uploadProfilePhoto(file).subscribe({
      next: () => {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.user.photo = reader.result as string; // Mise à jour immédiate de l'image affichée
        };
  
        reader.readAsDataURL(file);
  
        // ✅ Affiche une notification de succès
        this.notification = {
          message: '✅ Photo mise à jour avec succès',
          type: 'success'
        };
  
        // ⏳ Masquer la notification après 3 secondes
        setTimeout(() => {
          this.notification.message = '';
          this.notification.type = '';
        }, 3000);
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'upload :", err);
  
        // ❌ Affiche une notification d'erreur
        this.notification = {
          message: '❌ Erreur lors de l\'envoi de la photo',
          type: 'error'
        };
  
        setTimeout(() => {
          this.notification.message = '';
          this.notification.type = '';
        }, 3000);
      }
    });
  }
  
  

  removePhoto() {
    this.isRemovingPhoto = true;
    setTimeout(() => {
      this.user.photo = '';
      this.isRemovingPhoto = false;
    }, 400);
  }
}
