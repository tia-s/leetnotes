class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n == 0) {
            return 0;
        }
        
        // min_prices[i] will hold the minimum price from day 0 to day i
        int[] minPrices = new int[n];
        minPrices[0] = prices[0];
        
        for (int i = 1; i < n; i++) {
            minPrices[i] = Math.min(minPrices[i - 1], prices[i]);
        }
        
        // calculate the profit for selling on each day and keep track of the maximum profit
        int maxProfit = 0;
        for (int i = 0; i < n; i++) {
            int currentProfit = prices[i] - minPrices[i];
            if (currentProfit > maxProfit) {
                maxProfit = currentProfit;
            }
        }
        
        return maxProfit;
    }
}