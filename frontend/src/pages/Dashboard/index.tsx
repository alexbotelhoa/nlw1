import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiArrowLeft, FiSearch, FiPlusCircle, FiPlus  } from 'react-icons/fi';
import axios from 'axios';

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

interface IBGEUfRes {
    sigla: string;
};

interface IBGECityRes {
    nome: string;
};

const Dashboard = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [items, setItems] = useState<Item[]>([]);


    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);




    useEffect(() => {
        api.get('points', {
        params: {
            city: 'Joinville',
            uf:  'SC',
            items: [
                1,
                3,
                5
            ]
        }
        }).then(res => {
        setPoints(res.data)
        })
    }, [selectedItems]);

    useEffect(() => {
        axios.get<IBGEUfRes[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const ufInitials = res.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') return;
        axios.get<IBGECityRes[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos`).then(res => {
            const cityNames = res.data.map(city => city.nome);
            setCities(cityNames);
        })
    }, [selectedUf]);

    useEffect(() => {
        api.get('items').then(res => {
          setItems(res.data)
        })
    }, []);




    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    };

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    };

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);
    
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }
    };

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const uf = selectedUf;
        const city = selectedCity;
        const items = selectedItems;

        const data = new FormData();
    }
    



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



                <form onSubmit={handleSubmit}>

                    <fieldset>
                        <div className="field-group">
                            <div className="field">
                                <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                    <option value="0">Selecione um UF</option>
                                    {ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                    <option value="0">Selecione uma cidade</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        {/* <legend>
                            <span>Selecione um ou mais ítens abaixo</span>
                        </legend> */}
                        <div className="field-group">
                            <div className="field">
                                <ul className="items-grid">
                                    {items.map(item => (
                                        <li 
                                            key={item.id} 
                                            onClick={() => handleSelectItem(item.id)}
                                            className={selectedItems.includes(item.id) ? 'selected' : ''}
                                        >
                                            <img width={42} height={42} src={item.image_url} title={item.title} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="field">
                                <button type="submit">
                                    <span>
                                        <FiSearch />
                                    </span>
                                    <strong>Buscar pontos de coleta</strong>
                                </button>
                                <div className="create-point">
                                    <div>
                                        <Link to="/create-point">
                                            <span>
                                                <FiPlus />
                                            </span>
                                            <strong>Cadastrar ponto de coleta</strong>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>


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



                {/* <footer>
                    <div>
                        <Link to="/create-point">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Cadastre um ponto de coleta</strong>
                        </Link>
                    </div>
                </footer> */}



                
            </div>
        </>
    )
}

export default Dashboard;
