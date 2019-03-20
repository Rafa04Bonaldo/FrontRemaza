import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';
import { NgbCalendar, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { GenericServiceService } from '../../shared/services/generic-service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private viacep: NgxViacepService, private config: NgbDatepickerConfig, private calendar: NgbCalendar, private service: GenericServiceService) {
    config.minDate = {year: calendar.getToday().year, month: calendar.getToday().month, day: calendar.getToday().day};
    config.maxDate = {year: 2099, month: 12, day: 31};
    // config.markDisabled = (date: NgbDate) => calendar.getPrev(date).month < calendar.getToday().month;
   }
  registerForm: FormGroup;
  escolha: any;
  mostra: any;
  model: any;
  @ViewChild('vendedor') vendedor: ElementRef;
  @ViewChild('filial') filial: ElementRef;

  TipoEscolha(event){
    this.escolha = event;
    
    if(this.escolha == this.vendedor.nativeElement.value){
      this.mostra = "V";
    }
    else if(this.escolha == this.filial.nativeElement.value){
      this.mostra = "F";
    }
  }

  buscaCEP(cep: string){
    this.viacep.buscarPorCep(cep).then( ( endereco: Endereco ) => {
      this.registerForm.controls['cepCliente'].setValue(endereco.cep);
      this.registerForm.controls['logradouroCliente'].setValue(endereco.logradouro);
      this.registerForm.controls['municipioCliente'].setValue(endereco.localidade);
      this.registerForm.controls['ufCliente'].setValue(endereco.uf);
     }).catch( (error: ErroCep) => {
      console.log(error.message);
     });
  }

  onSubmit(){
    let data = this.registerForm.controls['dtAtendimentoCliente'].value;
    let montaData = "";
    if(data['month'] < 10){
      montaData =  data['year']+"-0"+data['month']+"-"+data['day'];
    }
    else{
      montaData =  data['year']+"-"+data['month']+"-"+data['day'];
    }
    
    this.registerForm.controls['dtAtendimentoCliente'].setValue(montaData);
    
    if(this.mostra == "V"){
      this.registerForm.controls['desejoFlagCliente'].setValue("Desejo que um vendedor venha até mim");
    }
    else{
      this.registerForm.controls['desejoFlagCliente'].setValue("Desejo ir até a Filial Pacaembu");
    }
    
    this.service.create(this.registerForm.value).subscribe(result =>{
        console.log("bb", result)
        alert("Salvo com sucesso!");
    }, err => { alert("erro ao salvar!"); });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      idcliente: [null],
      nomeCliente: ['', Validators.required],
      tpConsorcioCliente: ['', Validators.required],
      valorCartaCreditoCliente: ['', Validators.required],
      telefoneCliente: ['', Validators.required],
      motivoContatoCliente: ['', Validators.required],
      desejoFlagCliente: [''],
      cepCliente: ['', Validators.required],
      municipioCliente: ['', Validators.required],
      ufCliente: ['', Validators.required],
      logradouroCliente: ['', Validators.required],
      numCliente: ['', Validators.required],
      dtAtendimentoCliente: ['', Validators.required],
      horarioAtendimentoCliente: ['', Validators.required]
    });

  }

}
