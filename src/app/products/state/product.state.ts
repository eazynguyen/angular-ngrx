import {AppState} from '../../../state/app.state';
import {Product} from '../product';

export interface State extends AppState {
    showProductCode: boolean;
    currentProductId: number;
    products: Product[];
    error: string;
}
