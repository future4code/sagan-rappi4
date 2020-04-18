import { setRestaurant, setCart } from './detailRestaurant';

describe("RestaurantDetail Action-Creators", () => {
    test("SetRestaurant", () => {

        const mockTodoText = "teste";
        const mockedAction = setRestaurant(mockTodoText);

        expect(mockedAction.type).toEqual("SET_RESTAURANT"); 
        expect(mockedAction.payload.restaurant).toBeDefined(); 
        expect(mockedAction.payload.restaurant).toEqual(mockTodoText);
    });

     test("SetCart", () => {

        const mockTodoText = "Testando RestaurantDetail";
        const mockedAction = setCart(mockTodoText);

        expect(mockedAction.type).toEqual("SET_CART"); 
        expect(mockedAction.payload.cart).toBeDefined(); 
        expect(mockedAction.payload.cart).toEqual(mockTodoText);
    }); 
})