'use client';

import React, { useState, useMemo } from 'react';
import { Search, Server, Activity, Zap } from 'lucide-react';

interface LavalinkServer {
  id: string;
  name: string;
  host: string;
  port: number;
  status: 'online' | 'offline';
  players: number;
  uptime: number;
  region: string;
  cpu: number;
  memory: number;
}

// Mock data - replace with actual API data
const mockServers: LavalinkServer[] = [
  {
    id: '1',
    name: 'Purple Prime',
    host: 'node1.example.com',
    port: 2333,
    status: 'online',
    players: 45,
    uptime: 99.8,
    region: 'US-East',
    cpu: 32,
    memory: 65,
  },
  {
    id: '2',
    name: 'Violet Vortex',
    host: 'node2.example.com',
    port: 2333,
    status: 'online',
    players: 82,
    uptime: 98.5,
    region: 'EU-West',
    cpu: 58,
    memory: 78,
  },
  {
    id: '3',
    name: 'Amethyst Aurora',
    host: 'node3.example.com',
    port: 2333,
    status: 'offline',
    players: 0,
    uptime: 87.2,
    region: 'Asia-East',
    cpu: 0,
    memory: 0,
  },
  {
    id: '4',
    name: 'Lavender Light',
    host: 'node4.example.com',
    port: 2333,
    status: 'online',
    players: 23,
    uptime: 99.2,
    region: 'US-West',
    cpu: 28,
    memory: 45,
  },
  {
    id: '5',
    name: 'Indigo Infinity',
    host: 'node5.example.com',
    port: 2333,
    status: 'online',
    players: 156,
    uptime: 99.5,
    region: 'EU-Central',
    cpu: 72,
    memory: 85,
  },
];

export default function ServerList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const regions = ['all', ...new Set(mockServers.map(s => s.region))];
  const statuses = ['all', 'online', 'offline'];

  const filteredServers = useMemo(() => {
    return mockServers.filter(server => {
      const matchesSearch =
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.host.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRegion =
        selectedRegion === 'all' || server.region === selectedRegion;
      
      const matchesStatus =
        selectedStatus === 'all' || server.status === selectedStatus;

      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [searchQuery, selectedRegion, selectedStatus]);

  const stats = {
    total: mockServers.length,
    online: mockServers.filter(s => s.status === 'online').length,
    totalPlayers: mockServers.reduce((sum, s) => sum + s.players, 0),
    avgUptime: (mockServers.reduce((sum, s) => sum + s.uptime, 0) / mockServers.length).toFixed(1),
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <div className="mb-10" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600">
          Lavalink Server List
        </h1>
        <p className="text-muted-foreground text-lg">
          Made by fahim • Deep Purple Theme
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" data-aos="zoom-in">
        <div className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-5 shadow-lg hover:shadow-purple-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Servers</p>
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
            </div>
            <Server className="w-10 h-10 text-primary/50" />
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-5 shadow-lg hover:shadow-purple-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Online</p>
              <p className="text-3xl font-bold text-green-500">{stats.online}</p>
            </div>
            <Activity className="w-10 h-10 text-green-500/50" />
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-5 shadow-lg hover:shadow-purple-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Players</p>
              <p className="text-3xl font-bold text-accent">{stats.totalPlayers}</p>
            </div>
            <Zap className="w-10 h-10 text-accent/50" />
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-5 shadow-lg hover:shadow-purple-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Uptime</p>
              <p className="text-3xl font-bold text-purple-500">{stats.avgUptime}%</p>
            </div>
            <Activity className="w-10 h-10 text-purple-500/50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-6 mb-8" data-aos="fade-up">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search servers by name or host..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-purple-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-purple-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-purple-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Server List */}
      <div className="space-y-4">
        {filteredServers.length > 0 ? (
          filteredServers.map((server, index) => (
            <div
              key={server.id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-6 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className={`w-3 h-3 rounded-full ${server.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {server.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      {server.host}:{server.port}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  server.status === 'online'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {server.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Region</p>
                  <p className="font-semibold text-foreground">{server.region}</p>
                </div>

                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Players</p>
                  <p className="font-semibold text-foreground">{server.players}</p>
                </div>

                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">CPU Usage</p>
                  <p className="font-semibold text-foreground">{server.cpu}%</p>
                </div>

                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Memory</p>
                  <p className="font-semibold text-foreground">{server.memory}%</p>
                </div>

                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                  <p className="font-semibold text-foreground">{server.uptime}%</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card/50 backdrop-blur-sm border border-purple-300/20 rounded-lg p-12 text-center">
            <p className="text-muted-foreground text-lg">No servers found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {filteredServers.length} of {mockServers.length} servers
      </div>
    </div>
  );
}
