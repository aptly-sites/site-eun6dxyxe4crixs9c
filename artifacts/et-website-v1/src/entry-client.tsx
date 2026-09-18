import { RentalDataContext, readInitialRentalData } from "@/features/rentals/RentalData";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

hydrateRoot(document.getElementById("root")!, <RentalDataContext.Provider value={readInitialRentalData()}><App /></RentalDataContext.Provider>);
