import { html, render } from 'lit-html';

type CountdownState = 'idle' | 'run' | 'done';

export class Countdown extends HTMLElement {

    private _count = 4;
    get count(): number {
        return this._count;
    }
    set count(newCount: number) {
        this._count = newCount;
        // TODO 1
    }

    private _state: CountdownState = 'idle';
    private get state(): CountdownState {
        return this._state;
    }
    get countdownState(): CountdownState {
        return this.state;
    }
    private set state(newState: CountdownState) {
        this._state = newState;
        this.triggerState();
        // TODO 1
    }

    constructor() {
        super();
    }

    triggerState() {
        // TODO 7
    }

    connectedCallback() {
        this.update();
    }

    static get observedAttributes() {
        return ['count'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'count':
                this.count = +newValue || 1; // default value is 1
                break;
        }
    }

    update() {
        render(this.template(), this);
    }

    start = () => {
        console.log('Start');
        // TODO 4

        setTimeout(() => {
            // TODO 4
        }, 1000 * this.count);
    };

    reset = () => {
        console.log('Reset');
        // TODO 6
    };

    updateCount = (event: Event) => {
        this.count = +(event.target as HTMLInputElement).value;
    }

    private template() {
        const { count, updateCount, state, start, reset } = this;

        return html`
        <div class=${state}>
            <div class="idle">
                <header>Countdown</header>
                <label>
                    in seconds
                    <!-- TODO 2 -->
                    <input type="number" min="1" max="10" value=${count} >
                </label>
                <!-- TODO 3 -->
                <button>Start</button>
            </div>
            <div class="run">
                <header>Running</header>
            </div>
            <div class="done">
                <header>Done</header>
                <!-- TODO 5 -->
                <button @click=${reset}>Reset</button>
            </div>
        </div>`;
    }
}

export default function () {
    customElements.define('hello-countdown', Countdown);

    const playground = document.querySelector('.playground');
    const ploper = (event: CustomEvent) => {
        console.log(`Plop ${event.detail}`);
        const classes = playground.querySelector('.state').classList;
        classes.remove('idle', 'run', 'done');
        classes.add(event.detail);
    };
    render(html`<hello-countdown @state=${ploper}></hello-countdown>
    <div class="state idle"></div>`, playground);

}