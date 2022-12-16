class Vehiculo{
  _rueda:number
  _color:string
  _tipo:string 


  constructor(cantRueda:number, tipo:string, color:string) {
      this._rueda = cantRueda;
      this._tipo = tipo;
      this._color = color
  }
  get rueda(){
    return this._rueda;
  }
  get tipo(){
    return this._tipo;
  }
  get color (){
    return this._color
  }

  descripcion(){
    return `el vehiculo es de tipo ${this._tipo}, tiene ${this._rueda} ruedas, es de color ${this._color}`
  }
  
  
}


class Monociclo extends Vehiculo{
  constructor() {
    super(1, 'Monociclo', 'Naranja');
  }
} 
class Triciclo extends Vehiculo{
  constructor(){
    super(3,'Triciclo','Rojo')
  }
}

class Moto extends Vehiculo{
  constructor() {
    super(2, 'Moto','Negro');
  }
  
}

class Auto extends Vehiculo{
  constructor() {
    super(4, 'Auto','Verde');
  }

}

class Trailer extends Vehiculo{
  constructor() {
    super(6, 'trailer','Negro');
  }
}

class factoryVehiculo{

  createVehicle(Rueda:number){
    if(Rueda === 1) {
      return new Monociclo();
    }else if(Rueda === 2) {
      return new Moto();
    }else if(Rueda === 3) {
      return new Triciclo();
    }else if(Rueda === 4) {
      return new Auto();
    }else if(Rueda === 6) {
      return new Trailer();
    }else {
      console.log('Error')
    }
    
  }
}



const crearVehiculo = new factoryVehiculo();

const monociclo = crearVehiculo.createVehicle(1);
console.log(monociclo.descripcion());

const moto = crearVehiculo.createVehicle(2);
console.log(moto.descripcion());

const triciclo = crearVehiculo.createVehicle(3);
console.log(triciclo.descripcion());

const auto = crearVehiculo.createVehicle(4);
console.log(auto.descripcion());

const trailer = crearVehiculo.createVehicle(6);
console.log(trailer.descripcion());


crearVehiculo.createVehicle(8);