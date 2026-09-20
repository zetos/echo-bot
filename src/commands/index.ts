import { ping } from './ping';
import { echo } from './echo';

const commandList = [ping, echo] as const;

export { commandList };
