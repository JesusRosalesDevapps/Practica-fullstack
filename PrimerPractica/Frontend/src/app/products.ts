export class Products {
    constructor(
        public id: number,
        public name: string,
        public category: string,
        public price: number,
        public stock: number,
        public available: boolean
    ) { }
}
