// const requests=require("requests");
// if(req.url=="leader.html"){
//     requests("http://localhost:5000/test")
//     .on('data',(chunk)=>{
//         const objData=JSON.parse(chunk);
//         const arrData=[objData];
//         console.log(arrData[0].name);
//     })
//     .on('end',(err)=>{

//     })
// }
// ************************
// import fetch from 'node-fetch';
// async function getPosts(){
//     const myposts=await fetch("http://localhost:5000/test");
//     const response=await myposts.json();
//     // console.log(response[0].name);
//     req.body.text=response[0].name;
// }
      


fetch("http://localhost:5000/test").then((data)=>{
    // console.log(data);  // json formate
    return data.json();// converted to object
}).then((objectData)=>{
    console.log(objectData[0].name);
    let tableData="";
    objectData.map((values)=>{
        tableData+=`
        <tr>
        <td>${values.name}</td>
        <td>${values.score}</td>
        </tr>`;
    });
    document.getElementById("data").innerHTML=tableData;
    // document.getElementById('table_body')
    console.log(tableData);
}).catch((err)=>{
    console.log(err);
})