import './buttons.scss';
import './app.css';
import { useState, useEffect } from 'react';
import Cow from './Components/Cow';
import Sheep from './Components/Sheep';
import rand from './Functions/rand';

function App() {
    const [animals, setAnimals] = useState([]);

    useEffect(_ => {
        try {
            const savedAnimals = JSON.parse(localStorage.getItem('animals')) || [];
            setAnimals(savedAnimals);
        } catch (error) {
            console.error('Failed to load animals from localStorage:', error);
        }
    }, []);

    useEffect(_ => {
        try {
            localStorage.setItem('animals', JSON.stringify(animals));
        } catch (error) {
            console.error('Failed to save animals to localStorage:', error);
        }
    }, [animals]);

    const addAnimals = _ => {
        const newAnimals = [];

        const sheepCount = rand(5, 20);
        for (let i = 0; i < sheepCount; i++) {
            let sheepId = 'A';
            for (let j = 0; j < 7; j++) {
                sheepId += rand(0, 9).toString();
            }
            newAnimals.push({
                id: sheepId,
                type: 'sheep',
                side: 'right',
            });
        }

        const cowsCount = rand(5, 20);
        for (let i = 0; i < cowsCount; i++) {
            let cowId = 'K';
            for (let j = 0; j < 7; j++) {
                cowId += rand(0, 9).toString();
            }
            newAnimals.push({
                id: cowId,
                type: 'cow',
                side: 'left',
            });
        }

        setAnimals(newAnimals);
    };

    const moveAnimal = id => {
        setAnimals(prevAnimals => {
            const movedAnimal = prevAnimals.find(animal => animal.id === id);
            if (!movedAnimal) return prevAnimals;

            const updatedAnimal = {
                ...movedAnimal,
                side: movedAnimal.side === 'left' ? 'right' : 'left',
            };

            const filteredAnimals = prevAnimals.filter(animal => animal.id !== id);
            return [...filteredAnimals, updatedAnimal];
        });
    };

    
    return (
        <div className="app">
            <header className="app-header">
                <div className="button-container">
                    <button className="blue" onClick={addAnimals}>Į ganyklą</button>
                    <button className="red" onClick={_ => setAnimals([])}>Paskersti visus</button>
                </div>
                <div className="pasture-container">
                    
                    <div className="pasture pasture-left">
                        <h2>Karvės</h2>
                        <div className="animals-container">
                            {animals
                                .filter((animal) => animal.side === 'left')
                                .map((animal) =>
                                    animal.type === 'cow' ? (
                                        <Cow key={animal.id} id={animal.id} onClick={_ => moveAnimal(animal.id)} />
                                    ) : (
                                        <Sheep key={animal.id} id={animal.id} onClick={_ => moveAnimal(animal.id)} />
                                    )
                                )}
                        </div>
                    </div>

                    <div className="pasture pasture-right">
                        <h2>Avys</h2>
                        <div className="animals-container">
                            {animals
                                .filter((animal) => animal.side === 'right')
                                .map((animal) =>
                                    animal.type === 'sheep' ? (
                                        <Sheep key={animal.id} id={animal.id} onClick={_ => moveAnimal(animal.id)} />
                                    ) : (
                                        <Cow key={animal.id} id={animal.id} onClick={_ => moveAnimal(animal.id)} />
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;