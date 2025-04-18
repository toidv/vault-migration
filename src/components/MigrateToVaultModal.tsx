import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import ProgressSteps from './ProgressSteps';
import TokenIcon from './TokenIcon';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Strategy {
  id: string;
  name?: string;
  tokenPair: string;
  network: string;
  priceRange: {
    min: string;
    max: string;
  };
  liquidity: string;
  hasActiveLiquidity?: boolean;
  currentPrice: {
    value: string;
    unit: string;
  };
  position?: {
    pool: string;
    status: string;
    initialLiquidity: string;
  };
  performance?: {
    totalValue: string;
    profitLoss: string;
    percentChange: string;
    isProfit: boolean;
  };
  fees?: {
    unclaimed: string;
    generated: string;
  };
  age?: string;
  owner?: string;
  currentRange?: {
    min: string;
    max: string;
    unit: string;
  };
  nextRanges?: {
    lower: {
      min: string;
      max: string;
      unit: string;
    };
    upper: {
      min: string;
      max: string;
      unit: string;
    };
  };
  rebalancingTriggers?: {
    lower: string;
    upper: string;
  };
  price?: {
    value: string;
    unit: string;
  };
}

interface MigrateToVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMigrationComplete: (vaultName: string) => void;
  strategy: Strategy;
}

const MigrateToVaultModal: React.FC<MigrateToVaultModalProps> = ({ 
  isOpen, 
  onClose, 
  onMigrationComplete, 
  strategy 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [withdrawnAmount, setWithdrawnAmount] = useState('0.0');
  const [vaultName, setVaultName] = useState(`MigratedVault - ${strategy.tokenPair.split('/')[0]}`);
  const [principalToken, setPrincipalToken] = useState(strategy.tokenPair.split('/')[0]);
  const [autoDeposit, setAutoDeposit] = useState(true);
  
  const steps = ["Withdraw", "Create Vault", "Migrate Settings"];
  
  const calculateLiquidityInUsd = () => {
    const liquidityAmount = parseFloat(strategy.liquidity);
    const tokenPrice = parseFloat(strategy.currentPrice.value);
    return (liquidityAmount * tokenPrice).toFixed(2);
  };
  
  const liquidityInUsd = calculateLiquidityInUsd();
  
  const handleWithdraw = () => {
    setIsLoading(true);
    setTimeout(() => {
      setWithdrawnAmount(strategy.liquidity);
      setIsLoading(false);
      setCurrentStep(1);
    }, 2000);
  };
  
  const handleCreateVault = () => {
    if (!vaultName) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 2000);
  };
  
  const handleMigrateSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onMigrationComplete(vaultName);
    }, 2000);
  };
  
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(0);
        setIsLoading(false);
        setVaultName(`MigratedVault - ${strategy.tokenPair.split('/')[0]}`);
        setPrincipalToken(strategy.tokenPair.split('/')[0]);
        setAutoDeposit(true);
      }, 300);
    }
  }, [isOpen, strategy]);
  
  const tokens = strategy.tokenPair.split('/');
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 p-4 rounded-md bg-black/40 border border-gray-800">
              <div className="flex items-center -space-x-2">
                <TokenIcon symbol={tokens[0]} size="md" />
                <TokenIcon symbol={tokens[1]} size="md" className="border-2 border-background" />
              </div>
              <div>
                <div className="font-medium">{strategy.tokenPair} Position</div>
                <div className="text-sm text-muted-foreground">
                  Current Liquidity: {strategy.liquidity} {tokens[0]} 
                  <span className="ml-1 text-blue-400">(~${liquidityInUsd})</span>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4">
              <p className="text-amber-400 font-medium">Withdrawal Required</p>
              <p className="text-sm text-muted-foreground mt-1">
                You need to withdraw your liquidity from this strategy before migrating to a vault.
                This will convert your LP position into a single token.
              </p>
            </div>
            
            <div className="grid gap-6 pt-2">
              <div>
                <Label htmlFor="zapOut">Zap Out Token</Label>
                <Select defaultValue={tokens[0]}>
                  <SelectTrigger className="w-full mt-2 bg-black border-gray-700">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => (
                      <SelectItem key={token} value={token}>{token}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Your LP position will be converted to this token
                </p>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-3 p-4 rounded-md bg-green-950/30 border border-green-900/50">
              <div className="bg-green-900/20 p-2 rounded-full">
                <TokenIcon symbol={principalToken} size="sm" />
              </div>
              <div>
                <div className="text-green-400 font-medium">Successfully Withdrawn</div>
                <div className="text-sm text-muted-foreground">
                  {withdrawnAmount} {principalToken} 
                  <span className="ml-1 text-blue-400">(~${liquidityInUsd})</span> available for deposit
                </div>
              </div>
            </div>
            
            <div className="grid gap-6">
              <div>
                <Label htmlFor="vaultName">Vault Name</Label>
                <Input
                  id="vaultName"
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
                  className="mt-2 bg-black border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="network">Network</Label>
                <Select defaultValue={strategy.network} disabled>
                  <SelectTrigger className="w-full mt-2 bg-black border-gray-700">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={strategy.network}>{strategy.network}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Inherited from your strategy
                </p>
              </div>
              
              <div>
                <Label htmlFor="principalToken">Principal Token</Label>
                <Select defaultValue={principalToken} onValueChange={setPrincipalToken}>
                  <SelectTrigger className="w-full mt-2 bg-black border-gray-700">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => (
                      <SelectItem key={token} value={token}>{token}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Base token used across all LP allocations
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoDeposit">Auto-deposit withdrawn token</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically deposit {withdrawnAmount} {principalToken} 
                    <span className="ml-1 text-blue-400">(~${liquidityInUsd})</span> into the new vault
                  </p>
                </div>
                <Switch 
                  id="autoDeposit" 
                  checked={autoDeposit}
                  onCheckedChange={setAutoDeposit}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="publishVault">Publish Vault</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow other users to deposit into your vault
                  </p>
                </div>
                <Switch id="publishVault" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 py-4">
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-md p-4">
              <p className="text-violet-400 font-medium">Vault Created Successfully</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your vault has been created and is ready to receive strategies.
              </p>
            </div>
            
            <div className="space-y-4">
              <Label>Migrating Strategy Configuration</Label>
              <div className="grid gap-4">
                <div className="p-4 rounded-md bg-black/60 border border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center -space-x-2">
                        <TokenIcon symbol={tokens[0]} size="sm" />
                        <TokenIcon symbol={tokens[1]} size="sm" className="border-2 border-background" />
                      </div>
                      <div className="font-medium">{strategy.tokenPair}</div>
                    </div>
                    <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                      Pool & Range
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Min Price:</span> ${strategy.priceRange.min}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Max Price:</span> ${strategy.priceRange.max}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-md bg-black/60 border border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Automation Settings</div>
                    <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                      Rules
                    </Badge>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="text-sm flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                      <span>Auto Rebalance: Every 24h if price moves ±5%</span>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                      <span>Auto Exit: If profit reaches 15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const renderFooterActions = () => {
    switch (currentStep) {
      case 0:
        return (
          <Button 
            onClick={handleWithdraw} 
            disabled={isLoading}
            className="w-full md:w-auto bg-gradient-to-r from-violet-500 to-blue-500 hover:brightness-110 border-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Withdrawing...
              </>
            ) : (
              "Withdraw & Continue"
            )}
          </Button>
        );
      case 1:
        return (
          <div className="w-full flex justify-between gap-2">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(0)}
              disabled={isLoading}
              className="border-gray-700 hover:bg-black/40"
            >
              Back
            </Button>
            <Button 
              onClick={handleCreateVault}
              disabled={isLoading || !vaultName}
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:brightness-110 border-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating Vault...
                </>
              ) : (
                "Create Vault"
              )}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="w-full flex justify-between gap-2">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              disabled={isLoading}
              className="border-gray-700 hover:bg-black/40"
            >
              Back
            </Button>
            <Button 
              onClick={handleMigrateSettings}
              disabled={isLoading}
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:brightness-110 border-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Completing Migration...
                </>
              ) : (
                "Complete Migration"
              )}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(
        "bg-black border-gray-800 text-white shadow-xl",
        "sm:max-w-md md:max-w-lg"
      )}>
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Migrate to Vault</DialogTitle>
          <DialogDescription className="text-gray-400">
            Convert your strategy into a vault with improved management capabilities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>
        
        {renderStepContent()}
        
        <DialogFooter>
          {renderFooterActions()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MigrateToVaultModal;
