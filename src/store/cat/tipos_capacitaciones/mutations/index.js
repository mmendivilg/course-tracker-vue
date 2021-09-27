import {Mutation} from "../types";

export default {
  [Mutation.TIPOS_CAPACITACIONES](state, tipos_capacitaciones) {
    state.tipos_capacitaciones = tipos_capacitaciones
  }
}