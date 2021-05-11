import { MixModelType } from '../../enums/mix-enums';
import { MixRestPortalRepository } from './mix-rest-portal-repository';
export declare abstract class ViewModelBase<T> {
    id: string | number;
    repository: MixRestPortalRepository<T>;
    /**
     *
     */
    constructor(modelType: MixModelType);
    create(): Promise<T>;
    update(): Promise<T>;
    delete(id: string | number): Promise<T>;
    abstract parseModel(): T;
    abstract parseView(model: T): void;
}
