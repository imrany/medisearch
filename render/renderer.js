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
const searchData=[
    {
        sickness:"Malaria",
        signs:"Headache, stomachache",
        desc:"Malaria is a back infection, a water bourne.",
        image:"../assets/comp.jpg"
    },
    {
        sickness:"Back pain",
        signs:"Fatigue, aging",
        desc:"Back pain mostly caused by fatigue and over work.",
        image:"../assets/comp1.jpg"
    },
    {
        sickness:"Cholera",
        signs:"Joint pain, stomachache",
        desc:"Cholera is a water borne disease.",
        image:"../assets/comp2.jpg"
    },
    {
        sickness:"Asthma",
        signs:"Joint pain, coughing",
        desc:"Asthma is a bad infection.",
        image:"../assets/comp1.jpg"
    }
]

function expand(e){
    searchContent.innerHTML=" ";
    var user_input=e.target.value;
    searchData.forEach(i=>{
    let result=i.signs.includes(user_input)
    if(result){
        console.log(i.desc)
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
        searchContent.innerHTML+=li;
    }
    })
}

function minimizeSearch(){
    searchContent.innerHTML=" ";
}

async function search(e){
    e.preventDefault();
    try {
        
    } catch (error) {
        alert(error.message)
    }
}

searchInput.addEventListener('change',expand);
searchForm.addEventListener("submit",search);
document.querySelector("body").addEventListener("click",minimizeSearch)
