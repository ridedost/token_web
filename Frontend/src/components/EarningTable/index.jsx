// import React from "react";
// import "./index.css";
// import { RiShoppingBag3Fill } from "react-icons/ri";
// const EarningTable = () => {
//   return (
//     <div>
//       <table className="nk-tb-list is-separate mb-3 dataTable">
//         <thead>
//           <tr className="nk-tb-item nk-tb-head">
//             <th className="nk-tb-col sorting_desc">
//               <span className="sub-text">Order</span>
//             </th>

//             <th className="nk-tb-col sorting">
//               <span className="sub-text">Date</span>
//             </th>
//             <th className="nk-tb-col tb-col-sm sorting">
//               <span className="sub-text">Earnings Status</span>
//             </th>
//             <th className="nk-tb-col tb-col-sm sorting">
//               <span className="sub-text">Customer</span>
//             </th>
//             <th className="nk-tb-col tb-col-sm sorting">
//               <span className="sub-text">Purchased</span>
//             </th>
//             <th className="nk-tb-col sorting">
//               <span className="sub-text">Order Total</span>
//             </th>
//             <th className="nk-tb-col sorting">
//               <span className="sub-text">Your Earnings</span>
//             </th>
//             <th className="nk-tb-col sorting">
//               <span className="sub-text">Actions</span>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="nk-tb-item odd">
//             <td className="nk-tb-col sorting_1">
//               <div>
//                 <span className="tb-lead">#2758</span>
//               </div>
//             </td>
//             <td className="nk-tb-col tb-col-md">
//               <div>
//                 <span className="tb-sub">February 4, 2023</span>
//               </div>
//             </td>
//             <td className="nk-tb-col">
//               <div>
//                 <span className="dot bg-warning d-mb-none"></span>
//                 <span className="badge badge-sm badge-dot has-bg badge-success d-none d-mb-inline-flex">
//                   Completed
//                 </span>
//               </div>
//             </td>
//             <td className="nk-tb-col tb-col-sm">
//               <div>
//                 <span className="tb-sub">Jim Johnson</span>
//               </div>
//             </td>
//             <td className="nk-tb-col tb-col-md">
//               <div>
//                 <span className="tb-sub text-primary">
//                   Hans Backpack x 5
//                   <br />
//                 </span>
//               </div>
//             </td>
//             <td className="nk-tb-col tb-col-sm">
//               <div>
//                 <span className="tb-lead">
//                   <span className="woocommerce-Price-amount amount">
//                     <bdi>
//                       <span className="woocommerce-Price-currencySymbol">
//                         £
//                       </span>
//                       400.00
//                     </bdi>
//                   </span>
//                 </span>
//               </div>
//             </td>
//             <td className="nk-tb-col ">
//               <div>
//                 <span className="tb-lead text-success">
//                   <span className="woocommerce-Price-amount amount">
//                     <bdi className="woocommerce-Price-currencySymbol">£</bdi>
//                     260.00
//                   </span>
//                 </span>
//               </div>
//             </td>
//             <td className="nk-tb-col ">
//               <div className="salesking_manage_order_container">
//                 <a className="anchor tb-lead">
//                   <button className="btn btn-sm btn-primary salesking_manage_order">
//                     <RiShoppingBag3Fill className="icon" />
//                     <span>Manage Order</span>
//                   </button>
//                 </a>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//         <tfoot></tfoot>
//       </table>
//     </div>
//   );
// };

// export default EarningTable;

import React from "react";
import "./index.css";
import { RiShoppingBag3Fill } from "react-icons/ri";

const EarningTable = () => {
  return (
    <div>
      <table className="nk-tb-list is-separate mb-3 dataTable">
        <thead>
          <tr className="nk-tb-item nk-tb-head">
            <th className="nk-tb-col sorting_desc">
              <span className="sub-text">Order</span>
            </th>

            <th className="nk-tb-col sorting">
              <span className="sub-text">Date</span>
            </th>
            <th className="nk-tb-col tb-col-sm sorting">
              <span className="sub-text">Earnings Status</span>
            </th>
            <th className="nk-tb-col tb-col-sm sorting">
              <span className="sub-text">Customer</span>
            </th>
            <th className="nk-tb-col tb-col-sm sorting">
              <span className="sub-text">Purchased</span>
            </th>
            <th className="nk-tb-col sorting">
              <span className="sub-text">Order Total</span>
            </th>
            <th className="nk-tb-col sorting">
              <span className="sub-text">Your Earnings</span>
            </th>
            <th className="nk-tb-col sorting">
              <span className="sub-text">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="nk-tb-item odd">
            <td className="nk-tb-col sorting_1">
              <div>
                <span className="tb-lead">#2758</span>
              </div>
            </td>
            <td className="nk-tb-col tb-col-md">
              <div>
                <span className="tb-sub">February 4, 2023</span>
              </div>
            </td>
            <td className="nk-tb-col">
              <div>
                <span className="dot bg-warning d-mb-none"></span>
                <span className="badge badge-sm badge-dot has-bg badge-success d-none d-mb-inline-flex">
                  Completed
                </span>
              </div>
            </td>
            <td className="nk-tb-col tb-col-sm">
              <div>
                <span className="tb-sub">Jim Johnson</span>
              </div>
            </td>
            <td className="nk-tb-col tb-col-md">
              <div>
                <span className="tb-sub text-primary">
                  Hans Backpack x 5
                  <br />
                </span>
              </div>
            </td>
            <td className="nk-tb-col tb-col-sm">
              <div>
                <span className="tb-lead">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      <span className="woocommerce-Price-currencySymbol">
                        £
                      </span>
                      400.00
                    </bdi>
                  </span>
                </span>
              </div>
            </td>
            <td className="nk-tb-col ">
              <div>
                <span className="tb-lead text-success">
                  <span className="woocommerce-Price-amount amount">
                    <bdi className="woocommerce-Price-currencySymbol">£</bdi>
                    260.00
                  </span>
                </span>
              </div>
            </td>
            <td className="nk-tb-col ">
              <div className="salesking_manage_order_container">
                <a className="anchor tb-lead">
                  <button className="btn btn-sm btn-primary salesking_manage_order">
                    <RiShoppingBag3Fill className="icon" />
                    <span>Manage Order</span>
                  </button>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default EarningTable;
