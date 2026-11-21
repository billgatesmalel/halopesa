-- Neon Database Schema for HaloPesa Mobile Financial Platform
-- Zero emojis used in schema and seed data

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    balance NUMERIC(15, 2) NOT NULL DEFAULT 485250.00,
    currency VARCHAR(5) NOT NULL DEFAULT 'TZS',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    tx_reference VARCHAR(50) UNIQUE NOT NULL,
    account_id INT REFERENCES accounts(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'transfer', 'withdrawal', 'bill', 'airtime', 'savings', 'deposit'
    amount NUMERIC(15, 2) NOT NULL,
    fee NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    recipient VARCHAR(50),
    network VARCHAR(30) DEFAULT 'HALOPESA',
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    agent_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    region VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    hours VARCHAR(60) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Account
INSERT INTO accounts (phone_number, account_name, balance, currency)
VALUES ('+255 628 123 456', 'Amina Juma Mohamed', 485250.00, 'TZS')
ON CONFLICT (phone_number) DO NOTHING;

-- Seed Initial Transactions
INSERT INTO transactions (tx_reference, title, category, amount, fee, recipient, network)
VALUES 
    ('HP918274102', 'Salary Deposit (Halotel Payroll)', 'deposit', 450000.00, 0.00, '+255 628 123 456', 'HALOPESA'),
    ('LP481029482', 'LUKU Electricity TANESCO', 'bill', -30000.00, 300.00, '24198201948', 'LUKU'),
    ('HP771928410', 'Sent to Juma Rashid (0622 918 201)', 'transfer', -15000.00, 450.00, '0622 918 201', 'HALOPESA'),
    ('AT192847291', 'Halotel Royal Bundle Top-up', 'airtime', -10000.00, 0.00, '+255 628 123 456', 'HALOTEL')
ON CONFLICT (tx_reference) DO NOTHING;

-- Seed Initial Agents
INSERT INTO agents (agent_code, name, region, district, address, phone, hours)
VALUES 
    ('882910', 'Halotel Direct Service Center - Mwenge', 'Dar es Salaam', 'Kinondoni', 'Old Bagamoyo Rd, Opposite Mwenge Complex', '+255 622 100 100', '08:00 - 20:00 (Mon - Sun)'),
    ('884102', 'Kariakoo Super Wakala - Msimbazi', 'Dar es Salaam', 'Ilala', 'Msimbazi Street near Big Bon', '+255 628 341 902', '07:30 - 21:00'),
    ('881230', 'Arusha Clock Tower Branch', 'Arusha', 'Arusha Urban', 'Boma Road, Next to Post Office', '+255 621 890 120', '08:00 - 18:30'),
    ('885741', 'Mwanza Rock City Halotel Hub', 'Mwanza', 'Nyamagana', 'Kenyatta Road, Mwanza CBD', '+255 629 112 334', '08:00 - 19:00'),
    ('883901', 'Dodoma Capital Service Plaza', 'Dodoma', 'Dodoma Urban', 'Kuu Street, Near Jamatini Roundabout', '+255 624 556 778', '08:00 - 19:30'),
    ('887019', 'Zanzibar Stone Town Agent Hub', 'Zanzibar', 'Mjini', 'Darajani Market Plaza, Zanzibar Town', '+255 627 990 011', '08:00 - 20:00')
ON CONFLICT (agent_code) DO NOTHING;
