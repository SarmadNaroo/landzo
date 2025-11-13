import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountInfo {
  name: string
  email: string
  password: string
}

export interface ClientDetails {
  company: string
  phone: string
  address: string
}

export interface RegistrationState {
  account: AccountInfo
  client: ClientDetails
}

const initialState: RegistrationState = {
  account: { name: '', email: '', password: '' },
  client: { company: '', phone: '', address: '' },
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateAccount(state, action: PayloadAction<Partial<AccountInfo>>) {
      state.account = { ...state.account, ...action.payload }
    },
    updateClient(state, action: PayloadAction<Partial<ClientDetails>>) {
      state.client = { ...state.client, ...action.payload }
    },
    reset(state) {
      state.account = initialState.account
      state.client = initialState.client
    },
  },
})

export const { updateAccount, updateClient, reset } = registrationSlice.actions
export default registrationSlice.reducer
