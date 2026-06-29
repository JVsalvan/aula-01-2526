import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardData } from "../../services/dashboardService";

interface DashboardState {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null; // Para controle de cache simples
}

const initialState: DashboardState = {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardData: (state, action: PayloadAction<DashboardData>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
            state.lastFetched = Date.now();
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        invalidateDashboard: (state) => {
            state.data = null;
            state.lastFetched = null;
        }
    }
});

export const { setDashboardData, setLoading, setError, invalidateDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
