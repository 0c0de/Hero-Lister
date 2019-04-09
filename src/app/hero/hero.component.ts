import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Hero } from '../hero';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {
  heroName = '';
  heroPower = '';
  heroArr = [];
  heroes: Hero[];
  superheropowers = '';
  superheroName = '';
  updated: boolean;
  isInEditMode: boolean;
  globalID: number;
  constructor(private titleService: Title) { }

  onDelete(id: number) {
    console.log(`Removing hero with id: ${id}`);
    const storedArr = JSON.parse(localStorage.getItem('heroes'));
    storedArr.splice(id, 1);
    document.getElementsByTagName('tr')[id + 1].innerHTML = '';
    const modifiedArr = JSON.stringify(storedArr);
    localStorage.setItem('heroes', modifiedArr);
  }

  onEdit(id: number) {
    const prevArr = JSON.parse(localStorage.getItem('heroes'));
    alert(`Vas a editar a ${prevArr[id].name}`);
    this.heroName = prevArr[id].name;
    this.heroPower = prevArr[id].superpowers;
    this.isInEditMode = true;
    this.globalID = id;
  }

  onSuperpower(event: any) {
    this.superheropowers = event.target.value;
    console.log(this.superheropowers);
  }

  onHeroName(event: any) {
    this.superheroName = event.target.value;
    console.log(this.superheroName);
  }

  onAdd() {
    const heroArr = JSON.parse(localStorage.getItem('heroes'));
    const lastID = (heroArr.length);
    const prevArrToSave = heroArr;

    if (this.isInEditMode) {
      const objToSave = {
        id: lastID,
        name: this.superheroName,
        superpowers: this.superheropowers
      };
      for (const i of prevArrToSave) {
        if (i.id === this.globalID) {
          if (objToSave.name !== '' || objToSave.name.trim() !== '') {
            i.name = objToSave.name;
          }
          if (objToSave.superpowers !== '' || objToSave.superpowers.trim() !== '') {
            i.superpowers = objToSave.superpowers;
          }
          alert(`Vas a Actualizar datos de: ${i.name}`);
          localStorage.setItem('heroes', JSON.stringify(prevArrToSave));
        }
      }
      window.location.href = '/';
    } else {
      const objToSave = {
        id: lastID,
        name: this.superheroName,
        superpowers: this.superheropowers
      };
      prevArrToSave.push(objToSave);
      const actualValueToSave = prevArrToSave;
      localStorage.setItem('heroes', JSON.stringify(actualValueToSave));
      alert(`Vas a Actualizar datos de: ${objToSave.name}`);
    }
    window.location.href = '/';
  }

  ngOnInit() {
    this.isInEditMode = false;
    this.updated = false;
    this.titleService.setTitle('Heroes Lister');
    if (localStorage.getItem('heroes') != null) {
      this.heroes = JSON.parse(localStorage.getItem('heroes'));
      console.log('That localstorage exists');
    } else {
      this.heroes = [
        { id: 0, name: 'Batman', superpowers: 'Ser rico' },
        { id: 1, name: 'Superman', superpowers: 'Parte pechos' },
        { id: 2, name: 'Homer Simpson', superpowers: 'El bar de MOE' },
        { id: 3, name: 'Peter Griffin', superpowers: 'Ir a la almeja borracha' },
        { id: 4, name: 'El Barto', superpowers: 'Cabrear a Skinner' },
        { id: 5, name: 'Hulk', superpowers: 'Hulk Destroza, Hulk Destruye' }
      ];
      localStorage.setItem('heroes', JSON.stringify(this.heroes));
      console.log(`${localStorage.getItem('heroes')}`);
    }
  }

}
