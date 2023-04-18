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

let searchData=[];
const fun=async()=>{
    const response=await window.versions.serve();
    searchData=response;
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

searchInput.addEventListener('change',expand);
searchInput.addEventListener('keydown',options);
searchForm.addEventListener("submit",search);
document.querySelector("body").addEventListener("dblclick",minimizeSearch)
