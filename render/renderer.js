/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const searchForm=document.querySelector("#search-form");
const searchInput=document.querySelector("#search-input");
const searchContent=document.querySelector("#search-content");
const resultContent=document.querySelector("#result-items");
const optionsElement=document.getElementById("options");
const openPlayground=document.getElementById("open-playground");
const playground=document.getElementById("playground");
const home=document.getElementById("home");
const closePlayground=document.getElementById("close");

let searchData=[];
let QnA=[]
const fun=async()=>{
    searchData=await window.versions.serve();
    QnA=await window.versions.QnA();
}
fun()

let user_options=[]
function options(e){
    const user_option=e.target.value;
    resultContent.innerHTML=" ";
    optionsElement.innerHTML=" ";
    user_options.forEach(i=>{
        let result_option=i.includes(user_option);
        if(result_option){
            let li=`
            <div class="flex text-justify w-full hover:bg-gray-300 cursor-pointer mt-4 py-2">
                <img src="../assets/icons/icon_clock.svg" class="w-[23px] h-[23px]"/>
                <p class="text-base text-black ml-2">${i}</p>
            </div>
            `
            optionsElement.addEventListener('click',expand)
            optionsElement.innerHTML+=li;
        }
    })
}

function expand(e){
    resultContent.innerHTML=" ";
    optionsElement.innerHTML=" ";
    var user_input=e.target.value;
    user_options.push(user_input);
    searchData.forEach(i=>{
    let result=i.signs.includes(user_input)
    if(result){
        let li=`
        <div class="text-justify w-full mt-4 py-2">
            <div class="flex justify-between border-b">
                <p class="text-lg text-black font-semibold">${i.sickness}</p>
            </div>
            <div class="flex-col">
                <div class="flex mt-4">
                    <img src="${i.image}" class="rounded-[20px] w-[100px] h-[100px]" alt=""/>
                    <div class="flex-col pl-4 py-5">
                        <p class="text-xl font-semibold">${i.sickness}</p>
                        <p class="text-slate-600 text-base">${i.desc}, ${i.signs}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        resultContent.innerHTML+=li;
    }
    })
}

function minimizeSearch(){
    resultContent.innerHTML=" ";
}

async function search(e){
    e.preventDefault();
    try {
        
    } catch (error) {
        alert(error.message)
    }
}

function clickOpenPlayground(){
    playground.style.display="block";
    home.style.display="none"
}
function clickClosePlayground(){
    playground.style.display="none";
    home.style.display="block";
}

const playgroundForm=document.getElementById("playground-form");
const playgroundInput=document.getElementById("playground-input");
const examples=document.getElementById("examples");
const chatWindow=document.getElementById("chat-window");

let count=0;
let res=0;
function submit(e){
    e.preventDefault();
    const input=playgroundForm.input.value;
    examples.style.display="none";
    chatWindow.style.display="block"
    try {

        QnA.map(i=>{
            i.tags.map(item=>{
                let result=item.includes(input)
                if(result){
                    console.log(i)
                    let li=`
                        <div class="text-lg py-10 flex bg-gray-100 px-10" id="question">
                            <img src="../assets/bot.jpeg" alt="bot" class="w-10 h-10 rounded-[10px]"/>
                            <p class="py-1 pl-3">${input}</p>
                        </div>
                        <div class="flex text-lg bg-gray-300 pb-10 pt-5 px-10" id="answer">
                            <p class="res-${res} mr-2"></p> 
                        </div>
                    `
                    chatWindow.innerHTML+=li;
                    var point=document.createElement("div")
                    var newDiv = document.createElement("div");
                    newDiv.className=`my-class-${count}`;
                    let timer;
                    let n = 0;
                    function type() {
                        document.querySelector(`.my-class-${count}`).innerHTML+=`${i.answer[n]}`;
                        n++;
                        if(n >= i.answer.length){
                            clearInterval(timer);
                            playgroundForm.style.display="flex"
                            document.getElementById("bottom").scrollIntoView();
                            ++count;
                            ++res
                        }else{
                            playgroundForm.style.display="none";
                        } 
                    } 
                    timer = setInterval(type, 100);
                    document.querySelector(`.res-${res}`).appendChild(newDiv)
                    point.innerHTML="<span id='cursor' class='point font-[monospace]'>&nbsp;</span>"
                    document.querySelector(`.res-${res}`).after(point);
                    //
                    document.querySelector(`.res-${res}`).after(poit);
                }
            })
        });
        playgroundForm.reset()
    } catch (error) {
        console.log(error.message)
    }
}

playgroundForm.addEventListener("submit",submit);
closePlayground.addEventListener("click",clickClosePlayground)
openPlayground.addEventListener('click',clickOpenPlayground);
searchInput.addEventListener('change',expand);
searchInput.addEventListener('keydown',options);
searchForm.addEventListener("submit",search);
document.querySelector("body").addEventListener("dblclick",minimizeSearch)
