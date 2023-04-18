/**
 * @copyright itQuelle
 */

interface showOptions{
    url: string;
    width?: string|any;
    height?: string|any;
}

class itQuelleModalViewer{

    pageLoading;
    ModalCSS = ':root{--blur:10px;--width:400px;--height:500px;--background:#fff}.itQuelleModal{transition:opacity .2s;display:flex;justify-content:center;align-content:center;align-items:center;position:fixed;left:0;right:0;bottom:0;top:0;z-index:10000;background:rgba(0,0,0,.5);backdrop-filter:blur(var(--blur))}.itQuelleModal.Docked{align-content:flex-start;align-items:flex-start;justify-content:center;overflow:auto}.itQuelleModal.Docked .__View .__ViewContent{overflow:inherit}.itQuelleModal.Hide{display:none}.itQuelleModal .__View{box-shadow:0 0 30px 0 rgba(0,0,0,.2);border-radius:8px;-webkit-border-radius:8px;background:var(--background);display:inline-block;width:var(--width);height:var(--height);position:relative}@media screen and (max-width:400px){.itQuelleModal .__View{width:100%}}.itQuelleModal .__View .__Close{position:absolute;top:5px;right:5px}.itQuelleModal .__View .__Close .__CloseButton{padding:.2rem;cursor:pointer;display:flex;justify-content:center;align-items:center;width:20px;height:20px;border-radius:6px;-webkit-border-radius:6px}.itQuelleModal .__View .__Close .__CloseButton:hover{background:#eee}.itQuelleModal .__View .__Close .__CloseButton:active{background:#e2e2e2}.itQuelleModal .__View .__ViewContent{display:none;width:100%;max-height:100%;overflow:auto}.itQuelleModal .__View .__ViewContent.Show{display:inline-block}.itQuelleModal .__View .__Loading{display:flex;width:100%;height:100%;align-items:center;justify-content:center}.itQuelleModal .__View .__Loading.Hide{display:none}.itQuelleModal .__View .__Loading .__Load{margin:0 10px;width:50px;height:50px;border-radius:50%;border:4px solid #f3f3f3;border-top:4px solid #6200ea;animation:1s linear infinite rotating-spinner}@keyframes rotating-spinner{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
    ModalHTML = '<div class="itQuelleModal Hide">\n' +
        '    <div class="__View">\n' +
        '        <div class="__Close"><div class="__CloseButton" onclick="ModalViewer.hide()"><svg width="18" height="18" viewBox="0 0 19 18"><path d="M13.8 4.6L9.5 8.89 5.21 4.6l-.61.61 4.29 4.3-4.29 4.28.61.62 4.3-4.3 4.28 4.3.62-.62-4.3-4.29 4.3-4.29" fill-rule="evenodd"></path></svg></div></div>\n' +
        '        <div class="__Loading"><div class="__Load"></div></div>\n' +
        '        <div class="__ViewContent"></div>\n' +
        '    </div>\n' +
        '</div>';

    show(options: showOptions): void{
        const root = document.documentElement;
        root.style.setProperty('--width', '400px');
        root.style.setProperty('--height', '500px');

        if(options.width){
            root.style.setProperty('--width', options.width);
        }
        if(options.height){
            root.style.setProperty('--height', options.height);
        }

        const element = document.querySelector('.itQuelleModal');
        element.classList.remove('Hide');
        // @ts-ignore
        element.style.opacity = "1";
        // Page
        const loading = element.querySelector('.__Loading');
        const content = element.querySelector('.__ViewContent');
        loading.classList.remove("Hide");
        content.classList.remove("Show");

        fetch(options.url)
            .then(response => response.text())
            .then(result => {
                loading.classList.add("Hide");
                content.classList.add("Show");
                content.innerHTML = result;
            })
    }

    hide(): void{
        const element = document.querySelector('.itQuelleModal');
        // @ts-ignore
        element.style.opacity = '0';
        element.addEventListener('transitionend', () => {
            element.classList.add("Hide");
        });
    }

    initialize(){
        const element = document.getElementsByTagName('body')[0];
        element.insertAdjacentHTML("afterend", this.ModalHTML);
        element.insertAdjacentHTML("afterbegin", '<style>'+this.ModalCSS+'</style>')

        addEventListener("resize", event => {
            const modalHeight = document.querySelector('.itQuelleModal .__View');
            const windowHeight = window.innerHeight;

            const element = document.querySelector('.itQuelleModal');
            // @ts-ignore
            if(windowHeight < modalHeight.offsetHeight){
                element.classList.add("Docked");
            }else{
                element.classList.remove("Docked");
            }

        });

    }

}

let ModalViewer = new itQuelleModalViewer();