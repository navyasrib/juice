var fs = require('fs');

var count = function(){
    var juiceData = fs.readFileSync('./juice_orders');
    juiceData = JSON.parse(juiceData);
    var juices = {};
    for(var i=0; i<juiceData.length; i++){
        var fruitName = juiceData[i].drinkName;
        fruitName = fruitName.toLowerCase();
        if(!juices[fruitName]){
            juices[fruitName] = 0;
        }
        juices[fruitName]++;
    }
    delete juices['register user'];
    delete juices['ctl'];
    var allJuices = [];
    for(var fruit in juices){
        allJuices.push({name:fruit, count:juices[fruit]})
    }
    fs.writeFileSync('/Users/basava/D3/juice/public/data.json',JSON.stringify(allJuices));
};

module.exports = count;