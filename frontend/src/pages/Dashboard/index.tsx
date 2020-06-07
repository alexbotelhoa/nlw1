import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

interface Point {
    id: number;
    name: string;
    image_url: string;
};

interface Item {
    id: number;
    title: string;
    image_url: string;
};


const Dashboard = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [items, setItems] = useState<Item[]>([]);


    return (
        <>
            <div id="page-dashboard">
                <header>
                    <img src={logo} alt="Ecoleta" />

                    <Link to="/">
                        <span>
                            <FiArrowLeft />
                        </span>
                        <strong>Voltar ao Home</strong>
                    </Link>
                </header>



                <div className="content">
                    <ul>
                        <li key="1">
                            <img src="http://192.168.1.101:3333/uploads/066ebd2b2fbd-market2.jpg" alt="" />
                            <div>
                                <strong>Marcadinho</strong>
                                <p>Lâmpada, Papelão</p>
                            </div>
                        </li>

                        <li key="1">
                            <img src="http://192.168.1.101:3333/uploads/066ebd2b2fbd-market2.jpg" alt="" />
                            <div>
                                <strong>Marcadinho</strong>
                                <p>Lâmpada, Papelão</p>
                            </div>
                        </li>

                        <li key="1">
                            <img src="http://192.168.1.101:3333/uploads/066ebd2b2fbd-market2.jpg" alt="" />
                            <div>
                                <strong>Marcadinho</strong>
                                <p>Lâmpada, Papelão</p>
                            </div>
                        </li>

                        <li key="1">
                            <img src="http://192.168.1.101:3333/uploads/066ebd2b2fbd-market2.jpg" alt="" />
                            <div>
                                <strong>Marcadinho</strong>
                                <p>Lâmpada, Papelão</p>
                            </div>
                        </li>

                        <li key="1">
                            <img src="http://192.168.1.101:3333/uploads/066ebd2b2fbd-market2.jpg" alt="" />
                            <div>
                                <strong>Marcadinho</strong>
                                <p>Lâmpada, Papelão</p>
                            </div>
                        </li>
                    </ul>
                </div>



                <footer>
                    <div>
                        <Link to="/create-point">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Cadastre um ponto de coleta</strong>
                        </Link>
                    </div>
                </footer>



                
            </div>
        </>
    )
}

export default Dashboard;
