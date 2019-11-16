// function* Generator(val){
//    val = yield val * 2 
//    console.log(val);
   
//    yield val 
// }

// let generator  = Generator(2)
// console.log(generator);

// let a1 = generator.next(3)
// let a2 = generator.next(9)
// let a3 = generator.next(5)

// console.log(a1);
// console.log(a2);
// console.log(a3);



// ----------------

// const promise = new Promise((resolve,reject)=>{
   
//    resolve()
// })

// function resolve(){
//     let a = 10/0
// }

// promise.then(val=>{
//     console.log(val+"草拟吗");
    
// }).catch(err=>{
//     console.log(err+"操你爸");
    
// })
// 'use strict' 
{
"use strict"
    const player = {
        names:["科比","詹姆斯","杜兰特"],
        get firstPlayer() {
            console.log('获取球员信息');
            return this.names[0]
        },
    
        set firstPlayer(value) {
            console.log("设置球员信息");
            if(typeof(value)!=="string"){
                console.log('类型错误');
                
                return 
            }
            this.names[0] = value
        },
    
        get lastPlayer(){
            return this.names[2]
        } 
    }
    
    
    console.log(player.firstPlayer);
    
    player.firstPlayer = "诺维斯基"
    // player.lastPlayer = 'ds'
    player.firstPlayer = 222
    console.log(player.firstPlayer);
    console.log(player.lastPlayer);
    
}

function foo(){
    let a=b=0;
    a++
    return a 
}

foo()
console.log(typeof a);
console.log(a);

console.log(typeof b);
console.log(b);