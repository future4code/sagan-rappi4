import { setSignUp } from './signUp';

describe("SignUp Action-Creators", () => {
    test("SetSignUp", () => {
        const mockTodoText = "Teste do signup";
        const mockedAction = setSignUp(mockTodoText);

        expect(mockedAction.type).toEqual("SIGN_UP"); 
        expect(mockedAction.payload).toBeDefined(); 
        expect(mockedAction.payload).toEqual(mockTodoText);
    })
})
