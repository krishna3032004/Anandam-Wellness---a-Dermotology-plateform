"use client";
import { useState } from "react";

export default function ArticlesPage() {
  const [articles] = useState([
    {
      id: 1,
      title: "How to Build a Skincare Routine",
      content: `A good skincare routine includes four essential steps: cleansing, exfoliating, moisturizing, and sun protection. 
      - **Cleansing:** Wash your face twice daily using a gentle cleanser to remove dirt and excess oil.
      - **Exfoliating:** Use chemical exfoliants like AHA/BHA 2-3 times a week to remove dead skin cells.
      - **Moisturizing:** Hydrate your skin with a moisturizer that suits your skin type.
      - **Sun Protection:** Apply SPF 30+ sunscreen daily to prevent premature aging and sun damage.`,
    },
    {
      id: 2,
      title: "Best Ingredients for Acne-Prone Skin",
      content: `If you struggle with acne, the right ingredients can make a huge difference:
      - **Salicylic Acid:** Helps unclog pores and reduce breakouts.
      - **Niacinamide:** Controls oil production and reduces inflammation.
      - **Benzoyl Peroxide:** Fights acne-causing bacteria effectively.
      - **Hyaluronic Acid:** Provides hydration without clogging pores.
      - **Tea Tree Oil:** Natural antibacterial properties to calm breakouts.
      Always patch-test new products before adding them to your routine!`,
    },
    {
      id: 3,
      title: "Daily Skincare Tips for Glowing Skin",
      content: `Follow these dermatologist-approved tips to maintain a radiant complexion:
      - **Drink Enough Water:** Hydration is key to healthy skin.
      - **Use Vitamin C:** Helps brighten skin and reduce hyperpigmentation.
      - **Get Enough Sleep:** Poor sleep can lead to dull skin and breakouts.
      - **Avoid Touching Your Face:** Reduces the risk of bacteria spreading.
      - **Eat a Balanced Diet:** Include fruits, veggies, and healthy fats for better skin.`,
    },
    {
      id: 4,
      title: "How to Identify Your Skin Type",
      content: `Your skincare products should match your skin type. Here’s how to find out yours:
      - **Oily Skin:** Looks shiny, especially on the T-zone, with frequent breakouts.
      - **Dry Skin:** Feels tight and flaky, needs deep hydration.
      - **Combination Skin:** Oily in some areas (T-zone), dry in others.
      - **Sensitive Skin:** Easily irritated, prone to redness.
      - **Normal Skin:** Balanced, not too dry or oily.
      Choose products specifically formulated for your skin type!`,
    },
    {
      id: 5,
      title: "Myths About Skincare Debunked",
      content: `There are many skincare myths that can mislead people:
      - **"Oily skin doesn't need moisturizer."** False! Hydration is still essential.
      - **"Natural ingredients are always better."** Not always! Some natural ingredients can be irritating.
      - **"You don't need sunscreen on cloudy days."** UV rays penetrate clouds and still cause damage.
      - **"Pores can open and close."** Nope, they don't have muscles to do that!
      Understanding the facts will help you make better skincare choices.`,
    },
  ]);

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Common Skincare Articles</h2>
      {articles.map((article) => (
        <div key={article.id} className="mb-6 p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold text-[#FF9800]">{article.title}</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{article.content}</p>
        </div>
      ))}
    </div>
  );
}
