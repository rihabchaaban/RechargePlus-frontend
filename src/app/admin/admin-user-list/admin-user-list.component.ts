import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users: any[] = [];
  showForm = false;
  successMessage = '';
  userToEdit: any = null;

  newUser = {
    name: '',
    email: '',
    password: '',
    role: 'CLIENT'
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: () => alert('Erreur lors du chargement des utilisateurs')
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.userToEdit = null; // Réinitialise la modification
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.successMessage = "✅ Utilisateur ajouté avec succès";
        this.newUser = { name: '', email: '', password: '', role: 'CLIENT' };
        this.showForm = false;
        this.loadUsers();
        this.clearSuccessAfterDelay();
      },
      error: (err) => {
        if (err.status === 400 && err.error.includes("Email déjà utilisé")) {
          alert("❌ Cet email est déjà utilisé !");
        } else {
          alert("Erreur lors de l’ajout.");
        }
      }
    });
  }

  editUser(user: any) {
    this.userToEdit = { ...user };
    this.showForm = false;
  }

  cancelEdit() {
    this.userToEdit = null;
  }

  updateUser() {
    this.userService.updateUser(this.userToEdit.idUser, this.userToEdit).subscribe({
      next: () => {
        this.successMessage = "✅ Utilisateur mis à jour avec succès";
        this.loadUsers();
        this.userToEdit = null;
        this.clearSuccessAfterDelay();
      },
      error: () => alert("Erreur lors de la mise à jour")
    });
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.successMessage = "✅ Utilisateur supprimé avec succès";
          this.loadUsers();
          this.clearSuccessAfterDelay();
        },
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }

  private clearSuccessAfterDelay() {
    setTimeout(() => this.successMessage = '', 3000);
  }

  toggleStatus(id: number) {
    this.userService.toggleUserStatus(id).subscribe({
      next: (res: any) => {
        this.loadUsers(); // recharge la liste après modification
        this.successMessage = res.message || 'Statut mis à jour ✅';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        alert('Erreur lors du changement de statut');
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }
  

  searchTerm = '';

onSearch() {
  if (this.searchTerm.trim()) {
    this.userService.searchUsers(this.searchTerm).subscribe(users => {
      this.users = users;
    });
  } else {
    this.loadUsers(); // recharge tous les utilisateurs
  }
}



}
