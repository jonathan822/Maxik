import { Injectable } from '@angular/core';
import { deleteDoc, getDoc, setDoc, updateDoc, where, query, addDoc } from 'firebase/firestore';
import { Firestore, collectionData, collection, doc, docData} from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { Producto } from './modelos';
import { AngularFireList } from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uid = '';
  ProductList: AngularFireList<any>;
  constructor(private firestore: Firestore, private AuthenticationService: AuthenticationService) {

  }

  cargarId() {
    this.uid = this.AuthenticationService.getUid();
  }

  getTiendas() {
    const tiendas = collection(this.firestore, 'tienda');
    return collectionData(tiendas, { idField: 'id' });
  }

  getProductosTienda(id) {
    const productos = collection(this.firestore, `tienda/${id}/producto`);
    return collectionData(productos);
  }

  getProductoTienda(idTienda, idProducto) {
    const productos = doc(this.firestore, `tienda/${idTienda}/producto/${idProducto}`);
    return docData(productos);
  }

  createFirebaseUser(id, nombre, apellido, rut) {
    const usuario = collection(this.firestore, 'usuario');
    return setDoc(doc(usuario, id), { nombre: nombre, apellido: apellido, rut: rut })
  }

  /*createFirebaseProd(id, nombre, apellido) {
    const usuario = collection(this.firestore, 'usuario');
    return setDoc(doc(usuario, id), { nombre: nombre, apellido: apellido })
  }*/

  getUsuario(id) {
    const usuarios = doc(this.firestore, `usuario/${id}`);
    return docData(usuarios);
  }

  agregarProducto(idProducto, idTienda, Cantidad) {
    const usuario = collection(this.firestore, `usuario/${this.uid}/carrito`);
    this.getProductoTienda(idTienda, idProducto).subscribe(res => {
      const ficha = res;
      return setDoc(doc(usuario, idProducto), { id: idProducto ,nombre: ficha.nombre, precio: ficha.precio, stock: ficha.stock, cantidad: Cantidad })
    })
    /*const usuario = collection(this.firestore, `usuario/${this.uid}/carrito`);
    return setDoc(doc(usuario, idProducto), { cantidad: Cantidad })*/
  }

  getCarrito(idUsuario) {
    const carrito = collection(this.firestore, `usuario/${idUsuario}/carrito`);
    return collectionData(carrito);
  }

  eliminarProducto(idProducto){
    const productos = doc(this.firestore, `usuario/${this.uid}/carrito/${idProducto}`);
    return deleteDoc(productos);
  }

  async Updateuser(campo, valor, id) {
    const usuario = doc(this.firestore, 'usuario', id)
    await updateDoc(usuario, {
      [campo]: valor
    })
  }

  async createProduct(idTienda, nombre, descripcion, precio, stock){
    const productos = collection(this.firestore, `tienda/${idTienda}/producto/`);
    const ruta = doc(productos)
    setDoc(ruta, {"id" : ruta.id, "nombre": nombre, "descripcion": descripcion, "precio": precio, "stock": stock})
  }
  
  async actualizarCantidad(cantidad, idProducto){
    const carrito = doc(this.firestore, `usuario/${this.uid}/carrito/${idProducto}`)
    await updateDoc(carrito, {
      'cantidad': cantidad
    })
  }

  crearHistorial(documento){
    const coll1 = collection(this.firestore, `usuario/${this.uid}/historial/`);
    const doc1 = doc(coll1)
    setDoc(doc1, {"fechaCreacion": "TEST", "id": doc1.id})
    const coll2 = collection(this.firestore, `usuario/${this.uid}/historial/${doc1.id}/registro/`)
    for (var index in documento){
      setDoc(doc(coll2), { id: documento[index].id, nombre: documento[index].nombre, precio: documento[index].precio, cantidad: documento[index].cantidad})
    }
    for (var index1 in documento){
      const hola = doc(this.firestore, `usuario/${this.uid}/carrito/${documento[index1].id}`);
      deleteDoc(hola)
    }
  }

  traerHistorial(){
    this.cargarId();
    const historial = collection(this.firestore, `usuario/${this.uid}/historial/`)
    return collectionData(historial);
  }

  traerRegistro(idHistorial){
    const registro = collection(this.firestore, `usuario/${this.uid}/historial/${idHistorial}/registro`)
    return collectionData(registro)
  }

  eliminarProducto1(idProducto, idTienda){
    const productos = doc(this.firestore, `tienda/${idTienda}/producto/${idProducto}`);
    return deleteDoc(productos);

  }
  async Updateproduct(idtienda, id, nombre, descripcion, precio, stock) {
    const producto = doc(this.firestore,  `tienda/${idtienda}/producto/${id}`)
    await updateDoc(producto, {
      'nombre' : nombre,
      'descripcion': descripcion,
      'precio': precio,
      'stock': stock
    })

  }
}

