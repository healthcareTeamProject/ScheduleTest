import { SignInCustomer } from "src/types";
import { create } from "zustand";

interface SignInCustomerStore{
    signInCustomer: SignInCustomer | null;
    setSignInCustomer: (signInCustomer: SignInCustomer | null) => void;
}

const useStore = create<SignInCustomerStore>((set) => ({
    signInCustomer: null,
    setSignInCustomer: (signInCustomer: SignInCustomer | null) => { set((state) => ({...state, signInCustomer}))}
}));

export default useStore;