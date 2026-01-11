import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from './app/routes';
import BaseLayout from './app/layouts/BaseLayout';
import AppLayout from './app/layouts/AppLayout';
import AuthenticationPage from './pages/AuthenticationPage';
import CustomerPage from './pages/customer/CustomerPage';
import CustomerPostPage from './pages/customer/post/CustomerPostPage';
import MerchantPage from './pages/merchant/MerchantPage';
import MerchantPostPage from './pages/merchant/post/MerchantPostPage';
import { PATHS } from './app/routes/paths';

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route
          path={PATHS.auth}
          element={
            <PublicRoute>
              <AuthenticationPage />
            </PublicRoute>
          }
        />

        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute roles={["CUSTOMER"]} />}>
            <Route path={PATHS.customer} element={<CustomerPage />} />
            <Route path={PATHS.customerPost} element={<CustomerPostPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={["MERCHANT"]} />}>
            <Route path={PATHS.merchant} element={<MerchantPage />} />
            <Route path={PATHS.merchantPost} element={<MerchantPostPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={PATHS.auth} replace />} />
    </Routes>
  )
}

export default App
