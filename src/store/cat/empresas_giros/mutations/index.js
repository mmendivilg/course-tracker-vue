import {Mutation} from "../types";

export default {
  [Mutation.EMPRESAS_GIROS](state, empresas_giros) {
    state.empresas_giros = empresas_giros
  }
}