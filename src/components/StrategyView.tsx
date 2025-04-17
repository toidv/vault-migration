
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
  name: 'Aggressive Growth Strategy',
  tokenPair: 'WETH/USDC',
  priceRange: {
    min: '1800',
    max: '2200'
  },
  network: 'Base Mainnet',
  apy: '24.5%',
  liquidity: '32.45',
  hasActiveLiquidity: true,
};

const StrategyView: React.FC = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">Strategy View</h1>
          <p className="text-muted-foreground mt-1">Manage your Uniswap V3 strategy</p>
        </div>
        {mockStrategy.hasActiveLiquidity && (
          <Button 
            onClick={handleMigrateClick}
            className="bg-gradient-to-r from-krystal-primary to-krystal-accent hover:brightness-110 transition-all"
          >
            Migrate to Vault
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{mockStrategy.name}</CardTitle>
              <CardDescription className="mt-1">
                Created on Base Mainnet
              </CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className="border-krystal-primary text-krystal-primary px-3 py-1"
            >
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <TokenIcon symbol="WETH" size="md" />
                  <TokenIcon symbol="USDC" size="md" className="border-2 border-background" />
                </div>
                <div>
                  <div className="font-semibold">{mockStrategy.tokenPair}</div>
                  <div className="text-sm text-muted-foreground">0.05% Fee Tier</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-krystal-light/20">
                  <div className="text-sm text-muted-foreground">Min Price</div>
                  <div className="font-semibold">${mockStrategy.priceRange.min}</div>
                </div>
                <div className="p-3 rounded-lg bg-krystal-light/20">
                  <div className="text-sm text-muted-foreground">Max Price</div>
                  <div className="font-semibold">${mockStrategy.priceRange.max}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-krystal-light/20">
                  <div className="text-sm text-muted-foreground">APY</div>
                  <div className="font-semibold text-krystal-accent">{mockStrategy.apy}</div>
                </div>
                <div className="p-3 rounded-lg bg-krystal-light/20">
                  <div className="text-sm text-muted-foreground">Liquidity</div>
                  <div className="font-semibold">{mockStrategy.liquidity} WETH</div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-krystal-primary/10 border border-krystal-primary/30">
                <div className="text-sm font-medium text-krystal-primary">Auto Rebalance</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Enabled - Adjusts every 24 hours if price moves ±5%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-start pt-2 pb-4">
          <Button variant="outline" size="sm" className="text-sm">
            Increase Liquidity
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Remove Liquidity
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Claim Fees
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Compound Fees
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Manual Rebalance
          </Button>
        </CardFooter>
      </Card>

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
