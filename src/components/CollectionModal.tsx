"use client";

import { useState, useEffect } from "react";
import { X, Plus, FolderPlus } from "lucide-react";

interface Collection {
  id: string | number;
  name: string;
  recipeCount: number;
  isSelected?: boolean;
}

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string | number;
  recipeTitle: string;
}

// 模拟收藏夹数据
const mockCollections: Collection[] = [
  { id: 1, name: "我的最爱", recipeCount: 12 },
  { id: 2, name: "周末尝试", recipeCount: 5 },
  { id: 3, name: "家常菜", recipeCount: 8 },
];

export default function CollectionModal({
  isOpen,
  onClose,
  recipeId,
  recipeTitle
}: CollectionModalProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 模拟加载收藏夹数据
      const loadedCollections = mockCollections.map(collection => ({
        ...collection,
        isSelected: false
      }));
      setCollections(loadedCollections);
    }
  }, [isOpen]);

  const handleToggleCollection = (collectionId: string | number) => {
    setCollections(collections.map(collection => 
      collection.id === collectionId 
        ? { ...collection, isSelected: !collection.isSelected } 
        : collection
    ));
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    
    setIsSubmitting(true);
    
    // 模拟创建收藏夹
    setTimeout(() => {
      const newCollection = {
        id: Date.now(),
        name: newCollectionName.trim(),
        recipeCount: 1,
        isSelected: true
      };
      
      setCollections([...collections, newCollection]);
      setNewCollectionName("");
      setIsCreatingNew(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    
    // 模拟保存收藏
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">收藏食谱</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            将 "{recipeTitle}" 添加到收藏夹
          </p>
          
          <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
            {collections.map(collection => (
              <div 
                key={collection.id}
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => handleToggleCollection(collection.id)}
              >
                <input
                  type="checkbox"
                  checked={collection.isSelected}
                  onChange={() => {}}
                  className="h-4 w-4 text-[color:var(--primary)] focus:ring-[color:var(--primary)]"
                />
                <div className="ml-3 flex-grow">
                  <p className="font-medium">{collection.name}</p>
                  <p className="text-xs text-gray-500">{collection.recipeCount} 个食谱</p>
                </div>
              </div>
            ))}
          </div>
          
          {isCreatingNew ? (
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="收藏夹名称"
                  className="input flex-grow"
                  autoFocus
                />
                <button
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim() || isSubmitting}
                  className="ml-2 btn btn-primary"
                >
                  创建
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center text-[color:var(--primary)] hover:underline mb-4"
            >
              <Plus className="h-4 w-4 mr-1" />
              创建新收藏夹
            </button>
          )}
          
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onClose}
              className="btn btn-outline"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={!collections.some(c => c.isSelected) || isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "保存中..." : "保存"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}