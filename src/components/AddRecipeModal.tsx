'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import ButtonLoader from './ButtonLoader';
import { toast } from 'sonner';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipeData: Recipe) => Promise<void>;
  initialData?: Recipe;
}

// Recipe type from profile page
export interface Recipe {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  prepTime: number;
  difficulty: string;
  category: string;
  cuisine: string;
  diet: string;
  serves: number;
  calories?: number;
  ingredients: string[];
  instructions: string[];
  rating?: number;
  liked?: boolean;
  publishedDate?: string;
  [key: string]: unknown;
}

const CLOUDINARY_UPLOAD_PRESET = 'Jrecipesite'; // Your actual unsigned upload preset name
const CLOUDINARY_CLOUD_NAME = 'dof9wv5gr'; // Your actual Cloudinary cloud name

export default function AddRecipeModal({ isOpen, onClose, onSubmit, initialData }: AddRecipeModalProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    image: '',
    prepTime: '',
    difficulty: 'easy',
    category: 'breakfast',
    cuisine: 'american',
    diet: 'none',
    serves: '',
    calories: '',
    ingredients: [''],
    instructions: ['']
  });
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        ...initialData,
        prepTime: typeof initialData.prepTime === 'number' || typeof initialData.prepTime === 'string' ? initialData.prepTime.toString() : '',
        serves: typeof initialData.serves === 'number' || typeof initialData.serves === 'string' ? initialData.serves.toString() : '',
        calories: typeof initialData.calories === 'number' || typeof initialData.calories === 'string' ? initialData.calories.toString() : '',
        ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients as string[] : [''],
        instructions: Array.isArray(initialData.instructions) ? initialData.instructions as string[] : [''],
        image: typeof initialData.image === 'string' ? initialData.image : '',
      }));
      // Set initial image previews from existing data
      const existingImages = initialData.images || (initialData.image ? [initialData.image] : []);
      setImagePreviews(existingImages);
    }
  }, [initialData]);

  React.useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const categories = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'snack', label: 'Snacks' },
    { value: 'beverage', label: 'Beverages' }
  ];

  const cuisines = [
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'thai', label: 'Thai' },
    { value: 'greek', label: 'Greek' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'modern', label: 'Modern' }
  ];

  const diets = [
    { value: 'none', label: 'No Restrictions' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'gluten-free', label: 'Gluten Free' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'instructions', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      toast.success(`${files.length} image${files.length !== 1 ? 's' : ''} added! 📸`);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      // Revoke the URL to free up memory
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    toast.info('Image removed 🗑️');
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Image upload failed');
    return data.secure_url;
  };

  const handleMultipleImageUpload = async (files: File[]) => {
    const uploadPromises = files.map(file => handleImageUpload(file));
    return await Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      let imageUrls: string[] = [];
      
      // Upload new images if any
      if (imageFiles.length > 0) {
        imageUrls = await handleMultipleImageUpload(imageFiles);
      }
      
      // Include existing images from initial data
      const existingImages = imagePreviews.filter(preview => 
        !preview.startsWith('blob:') // Filter out blob URLs (new uploads)
      );
      
      const allImages = [...existingImages, ...imageUrls];
      
      if (allImages.length === 0) {
        const errorMsg = 'Please upload at least one recipe image.';
        setError(errorMsg);
        toast.error(errorMsg);
        setIsSubmitting(false);
        return;
      }

      await onSubmit({
        ...formData,
        image: allImages[0], // Keep primary image for backward compatibility
        images: allImages, // New array of all images
        prepTime: Number(formData.prepTime),
        serves: Number(formData.serves),
        calories: formData.calories ? Number(formData.calories) : undefined
      });
      toast.success('Recipe submitted successfully! 🎉');
      onClose();
    } catch (err: unknown) {
      let errorMsg = 'Failed to submit recipe';
      if (err instanceof Error) errorMsg = err.message;
      if (typeof err === 'object' && err && 'message' in err) {
        errorMsg = (err as any).message;
      }
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Sliding Panel */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            Add New Recipe
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recipe Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Recipe Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter recipe title..."
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your recipe..."
                rows={3}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Recipe Images * (You can select multiple images)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required={imagePreviews.length === 0}
              />
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Image Previews ({imagePreviews.length} image{imagePreviews.length !== 1 ? 's' : ''})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={preview}
                          alt={`Recipe Preview ${index + 1}`}
                          width={200}
                          height={128}
                          className="w-full h-32 object-cover border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Prep Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Prep Time (minutes) *
              </label>
              <input
                type="number"
                value={formData.prepTime}
                onChange={(e) => handleInputChange('prepTime', e.target.value)}
                placeholder="30"
                min="1"
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Serves */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Serves *
              </label>
              <input
                type="number"
                value={formData.serves}
                onChange={(e) => handleInputChange('serves', e.target.value)}
                placeholder="4"
                min="1"
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Calories */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Calories per Serving
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => handleInputChange('calories', e.target.value)}
                placeholder="250"
                min="1"
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Difficulty *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Cuisine *
              </label>
              <select
                value={formData.cuisine}
                onChange={(e) => handleInputChange('cuisine', e.target.value)}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine.value} value={cuisine.value}>
                    {cuisine.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Diet */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Diet *
              </label>
              <select
                value={formData.diet}
                onChange={(e) => handleInputChange('diet', e.target.value)}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {diets.map((diet) => (
                  <option key={diet.value} value={diet.value}>
                    {diet.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ingredients *
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required={index === 0}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('ingredients', index)}
                    className="p-3 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Instructions *
            </label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="flex-shrink-0 w-8 h-10 bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                  {index + 1}
                </div>
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  rows={2}
                  className="flex-1 p-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required={index === 0}
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('instructions', index)}
                    className="p-3 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('instructions')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white transition-colors font-semibold flex items-center justify-center"
              style={{ fontFamily: 'Caveat, cursive' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <ButtonLoader />
                  <span>Publishing...</span>
                </div>
              ) : (
                'Publish Recipe'
              )}
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
    </>
  );
}
