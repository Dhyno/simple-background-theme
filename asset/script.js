let input_text   = document.querySelector(".custom .detail");
let text         = document.querySelector(".speed .text");
let mod_button   = document.querySelector(".bar button");
let home_icon    = document.querySelector(".to-clr");
const dot        = document.querySelectorAll(".dot");
let burger       = document.querySelector(".burger");
const border_dot = document.querySelector(".dot4");
let bar          = document.querySelector(".bar");
let bg_div       = document.querySelector(".bg");
let nav          = document.querySelector("nav");
let crnt_clr     ='';
let sound_click  =[];

initSound();

dot.forEach(function(element,indeks) {

    element.addEventListener('click',function(e){
        if(element.classList.contains('dot1')) {
            change("#5fe5a0",true,"active");
            bar.children[1].textContent="#5fe5a0";

        } else if(element.classList.contains('dot2')) {
            change("#3ae2ff",true,"active");
            bar.children[1].textContent="#3ae2ff";

        } else if(element.classList.contains('dot3')) {
            change(" #f513f9",true,"active");
            bar.children[1].textContent="#f513f9";
        }

        border_dot.style.top=`${element.offsetTop}px`;
        input_text.children[0].value='';
        playSound(1);
        waitOut();
    });
});

input_text.children[0].addEventListener('input',()=> {
    let get_string="#";
    get_string+=input_text.children[0].value;
    get_string=get_string.toLowerCase();

    bar.children[1].textContent=get_string;

    if(get_string.length==7){
        let sucess=true;

        [...get_string].map( (e,i)  => {
            if( i>0 && !( (e >="a" && e<="f") || ( e>="0" && e <="9" ) ) ){
                sucess=false
            }
        });

        if(sucess){
            bar.children[1].textContent=`${get_string}`;
            change(get_string,false,"active");
            playSound(2);
            waitOut();
        } else {
            bar.children[1].textContent="#FAILED"
            text.textContent="must hex";
            playSound(0);
        }

        input_text.children[0].value="";
    }

    if(input_text.children[0].value.length>0){
        text.textContent="Test Text"
    }

    get_string='';
});

home_icon.addEventListener('mouseenter', () => {
    home_icon.style.backgroundColor="transparent";
    home_icon.style.border=`1px solid ${crnt_clr}`;
});

home_icon.addEventListener('mouseleave', () => {
    home_icon.style.borderColor="transparent";
    home_icon.style.backgroundColor=crnt_clr;
});

burger.addEventListener('click', () => {
    nav.classList.toggle("show");
    playSound(3);
});

home_icon.nextElementSibling.children[0].addEventListener('click',() => playSound(5));
mod_button.addEventListener("click", () => mod_button_click.run_func());
setInterval(() => automate.run_func(), 6600);





// function declare and iterable

function change(...color_cdtion) {
    text.style.textShadow           = `0px 0px 5px ${color_cdtion[0]},0px 0px 5px ${color_cdtion[0]}`;
    bar.style.boxShadow             =`-10px -30px 50px -20px ${color_cdtion[0]}`;
    input_text.style.boxShadow      = `0px 0px 40px ${color_cdtion[0]}`;
    bar.style.borderLeft            = `6px solid ${color_cdtion[0]}`;
    bar.style.borderTop             = `6px solid ${color_cdtion[0]}`;
    input_text.style.border         = `4px solid ${color_cdtion[0]}`;
    home_icon.style.backgroundColor = `${color_cdtion[0]}`;
    mod_button.style.borderColor    = `${color_cdtion[0]}`;
    bg_div.style.backgroundColor    =  color_cdtion[0];
    crnt_clr                        = color_cdtion[0];
    bg_div.classList.add(color_cdtion[2]);
    
    if(color_cdtion[1]){
        border_dot.style.boxShadow  = `0px 0px 1px 4px ${color_cdtion[0]}`;
    }
}

function waitOut(){
    setTimeout(() => {
        bg_div.classList.remove("active");
    }, 400);
}

function playSound(indek_arg){
    sound_click[indek_arg].play();
}

function initSound() {
    for(let i=0; i<6; i++){
        sound_click.push(new Audio(`asset/audio/sound${i+1}.wav`));
    }
}


let automate={
    color: ["#f9c74f","#90e0ef","#a6b6ff","#d5abff","#edabff","#ff47d1","#ff478a","#ff006e","#ff70a6","#ff6e6e"],
    counter: 1,
    run_func: function() {
        change(this.color[this.counter],false);
        if(this.counter==this.color.length){
            this.counter=0;
        }
        bar.children[1].textContent=this.color[this.counter];
        crnt_clr=this.color[this.counter];
        this.counter++;
        playSound(2);
    }
}

let mod_button_click={
    indeks: 1,
    mtble_txt: bar.children[1].textContent,
    run_func: function(){
        if(this.indeks==2){
            change("#5fe5a0",false,"active");
            this.mtble_txt="#5fe5a0";

        } else if(this.indeks==1){
            change("#3ae2ff",false,"active");
            this.mtble_txt="#3ae2ff";

        } else if(this.indeks==0){
            change(" #f513f9",false,"active");
            this.mtble_txt="#f513f9";
        } this.indeks++;

        if(this.indeks>2) {this.indeks=0;}
        crnt_clr=this.mtble_txt;
        playSound(2);
        waitOut();
    }
}

/* sound--
0.failed change color in input tag--
1.for dot movement---
2.for automate change color xxxx
3.for slide-------
4.for hover home icon   xxx
5.for bell------
*/