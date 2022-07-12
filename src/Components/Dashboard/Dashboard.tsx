import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface RocketInventory {
    id: number;
    model: string;
    year: number;
    stock: number;
}

interface RocketInventoryData {
    rocketInventory: RocketInventory[];
}

interface RocketInventoryVars {
    year: number;
}

const GET_ROCKET_INVENTORY = gql`
query ExampleQuery {
    fetchUser(id: 1) {
       fullName
        
    }
  }
`;

export function Dashboard() {
    const { loading, data } = useQuery(
        GET_ROCKET_INVENTORY

    );
    console.log(data)
    return (
        <div>
            <h3>Available Inventory</h3>
            {loading ? (
                <p>Loading ...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Stock</th>
                        </tr>

                    </thead>
                </table>
            )}
        </div>
    );
}