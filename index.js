var refresh = document.getElementById('ref');
var DATE=document.getElementById('date');
var del =document.getElementById('delete');
var lists=document.getElementById('lists');
var input=document.getElementById('input');
let List,id;
const line="line";
let options={
    weekday:'long',month:'short',day:'numeric'
}
let today=new Date();
let data=localStorage.getItem("TODO");
if(data){
    List=JSON.parse(data);
    id=List.length;
    loadList(List);

}
else{
    List=[];
    id=0;
}
function loadList(array){
    array.forEach((item) => {
        additem(item.name,item.id,item.Done,item.trash);
    });
}


DATE.innerHTML=`<p>${today.toLocaleDateString("en-US",options)}`;
refresh.addEventListener('click',()=>{
localStorage.clear();
location.reload();

}); 
function additem(t,id,done,trash){
     Check="fa-check-circle";
     Uncheck="fa-circle-o";
    if(trash){return;}
     
     Done=done?Check:Uncheck;
     
    text=` <div class="item">  <i id="${id}"class=" fa ${Done}" job="complete"aria-hidden="true"></i>
    <li>${t}</li>
    <i class="fa fa-trash" id="${id}"aria-hidden="true" job="delete"></i>
    </div>`;
    lists.insertAdjacentHTML("beforeend",text);
    
    
   
}
lists.addEventListener('click',(e)=>{
    element = e.target;
    elementJOB=e.target.attributes.job.value;
    if(elementJOB=="complete"){
        completetodo(element);

    }
    else if(elementJOB=="delete")
    {
        removetodo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(List));
    
});
function removetodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash=true;
}
function completetodo(element){
    
    element.classList.toggle(Check);
    element.classList.toggle(Uncheck);
    element.parentNode.querySelector("li").classList.toggle(line);
    List[element.id].done=List[element.id].done?false:true;
}

 document.addEventListener('keydown',(e)=>{
    k=e.keyCode;
     if(k==13){
         todo=input.value;
         
        if(todo){
           list= additem(todo,id,false,false);

        
            List.push(
                {
                    name:todo,
                    id:id,
                    Done:false,
                    trash:false
                }
            )
            localStorage.setItem("TODO",JSON.stringify(List));
            id++;
        
         }
        input.value="";
       
    }

}); 
