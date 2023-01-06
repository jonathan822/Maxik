export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
}

interface ProductoPedido {
    producto: Producto;
    cantidad: number;
}