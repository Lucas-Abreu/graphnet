import { Cliente, Provedor } from './model';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { CadastroService } from './cadastro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  filtro: string;

  provedores = [];

  provedoresAdicionados : Provedor [] = [
    {cep: "123",
    cnpj: "123",
    email: "123",
      id: 123,
      nomeFantasia: "123",
      razaoSocial: "123",
      senha: "123",
      telefone: "123"}
  ];


  private geoCoder;




  
  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;
  
  cliente = new Cliente();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private service: CadastroService,
    private rota: ActivatedRoute,
    private principal: Router) {}


  inserir(form: FormControl) {
    this.cliente.nome = this.nomeFormControl.value;
    this.cliente.email = this.emailFormControl.value;
    this.cliente.telefone = this.telefoneFormControl.value;
    this.cliente.cep = this.cepFormControl.value;
    this.cliente.latitude = this.latitude.toString();
    this.cliente.longitude = this.longitude.toString();
    this.service.adicionar(this.cliente);
  }

  
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setLocalizacao();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // Resultado do Place
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          // Verifica Resultado
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          // Setando Latitude, Longitude e o Zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  nomeFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  telefoneFormControl = new FormControl('', [
    Validators.required
  ]);

  cepFormControl = new FormControl('', [
    Validators.required
  ]);

  descricaoFormControl = new FormControl('', [
    Validators.required
  ]);
 
  

  private setLocalizacao() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('Nenhum resultado encontrado.');
        }
      } else {
        window.alert('Geocoder falhou devido a: ' + status);
      }
 
    });
  }
 
  filtrar(){
   
    this.filtro = this.cepFormControl.value;
    this.service.pesquisar(this.filtro)
    .then((dados)=>{
      this.provedores = dados;
    });
    
    console.log(this.provedoresAdicionados);
    console.log(this.provedores);
    
    
  }



}
