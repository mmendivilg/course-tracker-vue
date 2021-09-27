import {Mutation} from "../types";

export default {
  [Mutation.SUB_AREAS_OCUPACIONES](state, sub_areas_ocupaciones) {
    state.sub_areas_ocupaciones = sub_areas_ocupaciones
  },
  [Mutation.SUB_AREAS_OCUPACIONES_VFORMATTED](state, sub_areas_ocupaciones_vformatted) {
    state.sub_areas_ocupaciones_vformatted = sub_areas_ocupaciones_vformatted
  }
}