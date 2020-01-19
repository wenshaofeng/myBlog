
let car = {}
let val = 3000
Object.defineProperty(car, 'price', {
    enumerable: true,
    configurable: true,
    get() {
        console.log('price属性被读取了')
        return val
    },
    set(newVal) {
        console.log('price属性被修改了')
        val = newVal
    }
})

console.log(car.price);
car.price = 2000
console.log(car.price);