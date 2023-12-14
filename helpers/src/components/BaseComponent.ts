import { APIBaseComponent, ComponentType } from '../../../common/mod.ts';

export abstract class BaseComponent<
	TYPE extends Partial<APIBaseComponent<ComponentType>> = APIBaseComponent<
		ComponentType
	>,
> {
	constructor(public data: Partial<TYPE>) {}

	toJSON(): TYPE {
		return { ...this.data } as TYPE;
	}
}
