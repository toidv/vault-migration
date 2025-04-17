import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TokenIcon from './TokenIcon';
import MigrateToVaultModal from './MigrateToVaultModal';

// Mock data for demonstration purposes
const mockStrategy = {
  id: 'strat-01',
  name: 'WETH/USDC Strategy',
  tokenPair: 'WETH/USDC',
  priceRange: {
    min: '1800',
    max: '2200'
  },
  network: 'Base Mainnet',
  apy: '24.5%',
  liquidity: '32.45',
  hasActiveLiquidity: true,
  currentPrice: {
    value: '1989', 
    unit: 'USD'
  },
  position: {
    pool: 'SushiSwap V3 #1370',
    status: 'in range',
    initialLiquidity: '$6.49',
  },
  performance: {
    totalValue: '$5.61',
    profitLoss: '-$0.8402',
    percentChange: '37.95%',
    isProfit: true,
  },
  fees: {
    unclaimed: '0.04968',
    generated: '0.2817',
  },
  age: 'about 1 month',
  owner: '0x1822...89Ff',
  currentRange: {
    min: '0.1327',
    max: '0.2008',
    unit: 'USDC/WPOL',
  },
  nextRanges: {
    lower: {
      min: '0.1116',
      max: '0.1674',
      unit: 'USDC/WPOL',
    },
    upper: {
      min: '0.1552',
      max: '0.2328',
      unit: 'USDC/WPOL',
    },
  },
  rebalancingTriggers: {
    lower: '0.1395 USDC/WPOL',
    upper: '0.194 USDC/WPOL',
  },
  price: {
    value: '0.1809',
    unit: 'USDC/WPOL',
  },
};

const StrategyView: React.FC = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Calculate USD value for current liquidity
  const calculateLiquidityInUsd = () => {
    const liquidityAmount = parseFloat(mockStrategy.liquidity);
    const tokenPrice = parseFloat(mockStrategy.currentPrice.value);
    return (liquidityAmount * tokenPrice).toFixed(2);
  };

  const liquidityInUsd = calculateLiquidityInUsd();

  const handleMigrateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMigrationComplete = (vaultName: string) => {
    setIsModalOpen(false);
    toast({
      title: "Migration Successful!",
      description: `Your strategy has been migrated to vault: ${vaultName}`,
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 bg-black/95 min-h-screen text-white">
      <div className="flex items-center gap-2 mb-6 text-gray-400">
        <button className="hover:text-gray-200 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Strategies
        </button>
        <span>/</span>
        <span className="text-gray-300">#{mockStrategy.position.pool.split(' ')[2]}</span>
      </div>

      {/* Strategy Header Card */}
      <Card className="bg-black/80 border-gray-800 mb-4 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-2">
                  <TokenIcon symbol="WETH" size="md" />
                  <TokenIcon symbol="USDC" size="md" className="border-2 border-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{mockStrategy.tokenPair}</h2>
                    <Badge variant="outline" className="bg-gray-900/50 text-xs border-gray-700">0.3%</Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    Last position: {mockStrategy.position.pool} • 
                    <span className="text-green-400 ml-1">{mockStrategy.position.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Initial Liquidity</div>
                  <div>{mockStrategy.position.initialLiquidity}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Total value</div>
                  <div>{mockStrategy.performance.totalValue}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">P&L</div>
                  <div className={`${mockStrategy.performance.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {mockStrategy.performance.percentChange}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">P&L</div>
                  <div className="text-red-400">{mockStrategy.performance.profitLoss}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 p-4">
            <div>
              <div className="text-xs text-gray-400">Current liquidity</div>
              <div className="font-medium flex items-center">
                <span>{mockStrategy.liquidity} {mockStrategy.tokenPair.split('/')[0]}</span>
                <span className="ml-1 text-xs text-blue-400">(~${liquidityInUsd})</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Unclaimed fees</div>
              <div className="font-medium">${mockStrategy.fees.unclaimed}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Fees Generated</div>
              <div className="font-medium">${mockStrategy.fees.generated}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Age</div>
              <div className="font-medium">{mockStrategy.age}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Owner</div>
              <div className="font-medium flex items-center">
                {mockStrategy.owner}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-gray-400"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Details & Actions */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <Card className="bg-black/80 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">Performance</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-gray-900 border-gray-700 hover:bg-gray-800 text-xs h-7 rounded">24h</Button>
                  <Button variant="outline" size="sm" className="bg-gray-900 border-gray-700 hover:bg-gray-800 text-xs h-7 rounded">7D</Button>
                  <Button variant="outline" size="sm" className="bg-gray-900 border-gray-700 hover:bg-gray-800 text-xs h-7 rounded">30D</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-900/40 rounded-md flex items-center justify-center">
                <div className="text-gray-500">Performance Chart</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/80 border-gray-800">
            <CardHeader className="pb-2">
              <div className="text-lg font-medium">Strategy</div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-900/40 rounded-md flex items-center justify-center">
                <div className="text-gray-500">Range Visualization</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card className="bg-black/80 border-gray-800">
            <CardHeader>
              <CardTitle>Edit Strategy</CardTitle>
              <CardDescription className="text-gray-400">
                In order to adjust liquidity in this strategy, you will adjust the position {mockStrategy.position.pool} - {mockStrategy.tokenPair}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Automation</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                      <span>Auto Rebalance</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 px-3 bg-gray-900 border-gray-700 hover:bg-gray-800">Settings</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                      <span>Auto Exit</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 px-3 bg-gray-900 border-gray-700 hover:bg-gray-800">Settings</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Manual</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between border-gray-700 bg-gray-900 hover:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                      Increase liquidity
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-gray-700 bg-gray-900 hover:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                      Remove liquidity
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-gray-700 bg-gray-900 hover:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="m19.5 19.5-5-5"/><path d="M14 8.5a5.5 5.5 0 0 0 10.5 2.5"/></svg>
                      Claim fees
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-gray-700 bg-gray-900 hover:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h18v12H2z"/><path d="M2 16h18"/><path d="M13 5v9"/><path d="m9 9 4-4 4 4"/></svg>
                      Compound fees
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-gray-700 bg-gray-900 hover:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                      Rebalance
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>

                  {mockStrategy.hasActiveLiquidity && (
                    <Button 
                      onClick={handleMigrateClick}
                      className="w-full justify-between mt-4 bg-gradient-to-r from-violet-500 to-blue-500 hover:brightness-110 border-none"
                    >
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 8V5c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v3"/>
                          <path d="M19 16v3c0 1.1-.9 2-2 2H7a2 2 0 0 1-2-2v-3"/>
                          <path d="M4 12h16"/>
                          <path d="M12 5v14"/>
                          <path d="m15 9-3-3-3 3"/>
                          <path d="m15 15-3 3-3-3"/>
                        </svg>
                        Migrate to Vault
                      </div>
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MigrateToVaultModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        onMigrationComplete={handleMigrationComplete}
        strategy={mockStrategy}
      />
    </div>
  );
};

export default StrategyView;
