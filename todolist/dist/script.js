//新增
let todoData=[]
const inputText=document.getElementById('inputText')
const addBtn=document.getElementById('addBtn')
addBtn.addEventListener('click',addTodo)
function addTodo(){
    if(inputText.value===""){
        alert('請輸入資料')
        return
    }
    let obj={}
    obj.value=inputText.value
    obj.checked=""
    obj.id=new Date().getTime()
    todoData.unshift(obj)
    renderData(todoData)
    updateList()
}
//資料渲染
const list=document.querySelector('.list')
function renderData(arr){
    let str=''
    arr.forEach((i,index)=>{
    str+=`<li id="${i.id}" data-num="${index}">
    <label class="checkbox" for="">
        <input type="checkbox" ${i.checked}/>
        <span>${i.value}</span>
    </label>
    <a href="#" class="delete"></a>
</li>`
    })
    list.innerHTML=str
}
//tab切換
const tab=document.querySelector('.tab')
tab.addEventListener('click',switchTab)
let toggleStatus='all'
function switchTab(e){
    toggleStatus=e.target.dataset.tab
    let tabs=document.querySelectorAll('.tab li')
    tabs.forEach(i=>{
        i.classList.remove('active')
    })
    e.target.closest('li').classList.add('active')
    updateList()
}

//刪除and切換checked狀態功能
list.addEventListener('click',deletedAndChange)
function deletedAndChange(e){
    let id=e.target.closest('li').getAttribute('id')
    let num=e.target.closest('li').getAttribute('data-num')
    if(e.target.nodeName=="A"){
        todoData.splice(num,1)
    }else{
        //切換checked狀態功能
        todoData.forEach((i)=>{
            if(i.id==id){
                if(i.checked=="checked"){
                    i.checked=""
                }else{
                    i.checked="checked"
                }
            }
        })
    }
    updateList()
}
//更新代辦清單
function updateList(){
    let showData=''
    if(toggleStatus=='all'){
        showData=todoData
    }else if(toggleStatus=="work"){
        showData=todoData.filter(i=>{
            return i.checked==""
        })
    }else if(toggleStatus=="done"){
        showData=todoData.filter(i=>{
            return i.checked=="checked"
        })
    }
    const workNum=document.getElementById('workNum')
    let todoLength=todoData.filter(i=>{
        return i.checked==""
    })
    workNum.textContent=todoLength.length
    renderData(showData)
}

updateList()

//清除已完成項目
const deletedBTN=document.getElementById('deletedBTN')
deletedBTN.addEventListener('click',deletedDoneItem)
function deletedDoneItem(e){
    todoData=todoData.filter(i=>{
        return i.checked!='checked'
    })
    updateList()
}