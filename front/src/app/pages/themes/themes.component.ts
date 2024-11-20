import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme.interface';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

   themes: Theme[] = [
    { id:1, title: "Développement logiciel", description: 'Découvrez les technologies et frameworks les plus récents comme Angular, React ou Vue.js, pour créer des applications web rapides et performantes.' },
    { id: 2, title: "Intelligence artificielle et apprentissage automatique", description: 'Introduction à l\'IA' },
    { id: 3, title: "Sécurité informatique", description: 'Introduction à l\'IA' },
    { id: 4, title: "Développement mobile", description: 'Introduction à l\'IA' },
    { id: 5, title: "Programmation avancée", description: 'Introduction à l\'IA' },
    { id: 6, title: "Technologies émergentes", description: 'Introduction à l\'IA' },
    { id: 7, title: "Gestion de projet et DevOps", description: 'Introduction à l\'IA' }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
