import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen: boolean = false;
  userInput: string = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];

  // Dictionnaire FAQ
  faq: { [key: string]: string } = {
    'bonjour': 'Bonjour ! Comment puis-je vous aider ?',
    'comment créer un compte': 'Vous pouvez créer un compte depuis la page Inscription.',
    'comment demander un prêt': 'Rendez-vous dans la section Prêt et cliquez sur "Faire une demande".',
    'comment contacter l\'assistance': 'Utilisez le formulaire de contact dans la page Contact.',
    'merci': 'Avec plaisir 😊'
  };

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const question = this.userInput.toLowerCase().trim();
    this.messages.push({ from: 'user', text: this.userInput });

    const response = this.faq[question] || "Désolé, je n’ai pas compris. Essayez une autre question.";
    this.messages.push({ from: 'bot', text: response });

    this.userInput = '';
  }
}
