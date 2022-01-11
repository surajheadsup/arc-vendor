
import React, { useEffect, Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Order from '../Order/Order';
import Bidding from '../Order/Bidding';
import Product from '../Products/Product';
import AddProduct from '../Products/AddProduct';
import EditProduct from '../Products/EditProduct';

import * as Session from '../../Storage';

export default withRouter(function PermanentDrawerLeft(props) {

  return (
    <>
      <div className="main-wrapper">

        <nav className="sidebar">
        <div className="sidebar-header">
        <a href="#" className="sidebar-brand">
          Vendor<span>Admin</span>
        </a>
        <div className="sidebar-toggler not-active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
          <div className="sidebar-body">
        <ul className="nav">
          <li className="nav-item">
            <a href="/dashboard" className="nav-link">
              <i className="link-icon" data-feather="grid"></i>
              <span className="link-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item nav-category">Main</li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse"  href="/product" role="button" aria-expanded="false" aria-controls="emails">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Product</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse"  href="/order" role="button" aria-expanded="false" aria-controls="emails">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Order</span>
            </a>
          </li>
        </ul>
      </div>
        </nav>

        <div className="page-wrapper">
          <nav className="navbar">
            <a href="#" className="sidebar-toggler">
              <i data-feather="menu"></i>
            </a>
            <div className="navbar-content">
              <form className="search-form">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i data-feather="search"></i>
                    </div>
                  </div>
                  <input type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
                </div>
              </form>
              <ul className="navbar-nav">

                <li className="nav-item dropdown nav-profile">
                  <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <p>profile</p>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="profileDropdown">
                    <div className="dropdown-header d-flex flex-column align-Bidding-center">
                      <div className="figure mb-3">
                        <img src="#" alt="" />
                      </div>
                      <div className="info text-center">
                        <p className="name font-weight-bold mb-0">ARC ADMIN</p>
                        <p className="email text-muted mb-3"></p>
                      </div>
                    </div>
                    <div className="dropdown-body">
                      <ul className="profile-nav p-0 pt-3">
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            <i data-feather="user"></i>
                            <span>Profile</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            <i data-feather="edit"></i>
                            <span>Edit Profile</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            <i data-feather="repeat"></i>
                            <span>Switch User</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link" onClick={() => Session.clear()}>
                            <i data-feather="log-out"></i>
                            <span>Log Out</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <div className="page-content">

            <div className="">

              <Route path="/dashboard" exact
                render={() => <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
                }
              />
              <Route path="/order" exact
                render={() => <Suspense fallback={<div>Loading...</div>}>
                  <Order />
                </Suspense>
                }
              />  
              <Route path="/bidding/:id" exact
                render={() => <Suspense fallback={<div>Loading...</div>}>
                  <Bidding />
                </Suspense>
                }
              />  
              <Route path="/product" exact
                render={() => <Suspense fallback={<div>Loading...</div>}>
                  <Product />
                </Suspense>
                } 
              />  
              <Route path="/products/add" exact
                render={() => <Suspense fallback={<div>Loading...</div>}>
                  <AddProduct />
                </Suspense>
                }
              /> 
              <Route
                path="/products/edit/:id"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditProduct />
                  </Suspense>
                )}
              /> 
              
                          
            </div>
          </div>

          <footer className="footer d-flex flex-column flex-md-row align-Bidding-center justify-content-between">
            <p className="text-muted text-center text-md-left">Copyright © 2021 <a href="#" target="_blank">NobleUI</a>. All rights reserved</p>
            <p className="text-muted text-center text-md-left mb-0 d-none d-md-block">Handcrafted With <i className="mb-1 text-primary ml-1 icon-small" data-feather="heart"></i></p>
          </footer>

        </div>
      </div>
    </>
  )
});