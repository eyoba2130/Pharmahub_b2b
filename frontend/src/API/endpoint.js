/**
 * Centralized API endpoint definitions.
 * All paths are relative to the baseURL set in axiosConfig.
 */
const API = {
  // ─── Authentication ───
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  // ─── Medicines (public & admin) ───
  MEDICINES: {
    GET_ALL: '/medicines',                // GET (public)
    CREATE: '/medicines',                 // POST (admin only)
    GET_BY_ID: (id) => `/medicines/${id}`,
    UPDATE: (id) => `/medicines/${id}`,
    DELETE: (id) => `/medicines/${id}`,
  },

  // ─── Inventory (pharmacy & wholesaler) ───
  INVENTORY: {
    GET_ALL: '/inventory',                // GET – fetch own stock
    ADD: '/inventory',                    // POST – add new batch
    UPDATE: (id) => `/inventory/${id}`,   // PUT – update quantity/price
    DELETE: (id) => `/inventory/${id}`,   // DELETE – remove batch
    KPI: '/inventory/kpi',                // GET – dashboard KPIs (if implemented)
  },

  // ─── Orders ───
  ORDERS: {
    GET_ALL: '/orders',                   // GET – list orders (role‑based)
    CREATE: '/orders',                    // POST – create new order (pharmacy)
    UPDATE_STATUS: (id) => `/orders/${id}`, // PUT – update order status (wholesaler/admin)
  },

  // ─── Chat ───
  CHAT: {
    // GET messages – if orderId is provided, filter by order
    GET_MESSAGES: (orderId = null) => orderId ? `/chat/${orderId}` : '/chat',
    SEND: '/chat',                        // POST – send a new message
  },

  // ─── Admin ───
  ADMIN: {
    USERS: '/admin/users',                // GET – list all users
    VERIFY_USER: (id) => `/admin/verify/${id}`, // PUT – approve/reject user
    STATS: '/admin/stats',                // GET – system statistics
  },

  // ─── File Upload ───
  UPLOAD: '/upload',                      // POST – upload EFDA license, etc.
};

export default API;