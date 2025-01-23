import { render, screen } from '@testing-library/react-native';
import Index from '../../app/(tabs)';

describe("Testing home page", () => {

    it("Render home correctly.", () => {
        render(<Index />)
       expect(screen.getByText("Github Searcher")).toBeTruthy();
       expect(screen.getByText("What would you like to search for?")).toBeTruthy();
       expect(screen.getByText("Repositories")).toBeTruthy();
       expect(screen.getByText("Users")).toBeTruthy();
    })

})