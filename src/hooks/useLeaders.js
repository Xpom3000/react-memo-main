import { useContext } from "react";
import { LeadersContext } from "../context/Leaders";

export function useLeaders() {
  return useContext(LeadersContext);
}
